// ===== Background Service Worker =====
// 职责：定时抢票调度、实名人获取、网络请求监听、跨页面状态管理

import { PREP_STOP_CODES, PREP_END_CODES, PREP_RETRY_CODES, PREP_REFRESH_CODES, PREP_RESTART_CODES, PURC_STOP_CODES, PURC_END_CODES } from './consts.js';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ========== 状态管理 ==========
let globalState = {
  isRunning: false,
  config: null,
  currentPhase: 'idle', // idle | prep | purc | stock_check
  lastError: null,
  orderId: null,
  attemptCount: 0,
  stockCheckCount: 0,
  mode: 'presale', // presale | resale
  logs: [], // 日志队列，用于popup同步显示
  startTime: null
};

// ========== 日志管理（修复popup日志显示问题） ==========
function addLog(msg, type = 'info') {
  const entry = { time: Date.now(), msg, type };
  globalState.logs.push(entry);
  // 只保留最近200条日志
  if (globalState.logs.length > 200) {
    globalState.logs = globalState.logs.slice(-200);
  }
  console.log(`[BG][${type}] ${msg}`);
}

function clearLogs() {
  globalState.logs = [];
}

// ========== 存储管理 ==========
async function getStorage(key) {
  const result = await chrome.storage.local.get(key);
  return result[key];
}

async function setStorage(key, value) {
  await chrome.storage.local.set({ [key]: value });
}

// ========== 标签页管理 ==========
async function getMallTab() {
  const tabs = await chrome.tabs.query({ url: 'https://mall.bilibili.com/*' });
  return tabs[0] || null;
}

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0] || null;
}

// ========== 向内容脚本发送消息 ==========
async function sendToTab(tabId, action, data = {}) {
  try {
    return await chrome.tabs.sendMessage(tabId, { action, ...data });
  } catch (e) {
    console.error('[BG] 发送消息失败:', e);
    return null;
  }
}

// ========== 执行页面JS ==========
async function executeScript(tabId, func, args = []) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func,
      args,
      world: 'MAIN'
    });
    return results?.[0]?.result;
  } catch (e) {
    console.error('[BG] executeScript 失败:', e);
    return null;
  }
}

// ========== 实名人获取（在页面中发起请求，利用页面登录态） ==========
async function fetchBuyerList(projectId) {
  console.log('[BG] 获取实名人列表, projectId:', projectId);
  try {
    const tab = await getMallTab();
    if (!tab) {
      console.error('[BG] 未找到mall.bilibili.com标签页');
      return [];
    }

    const result = await executeScript(tab.id, (pid) => {
      return new Promise((resolve) => {
        const url = `https://show.bilibili.com/api/ticket/buyer/list?is_default&projectId=${pid}`;
        fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Referer': 'https://mall.bilibili.com/'
          }
        })
        .then(r => r.text())
        .then(text => {
          try {
            const data = JSON.parse(text);
            resolve(data);
          } catch (e) {
            resolve({ errno: -1, msg: 'JSON解析失败', raw: text.substring(0, 200) });
          }
        })
        .catch(e => {
          resolve({ errno: -1, msg: e.message });
        });
      });
    }, [projectId]);

    console.log('[BG] 实名人页面fetch结果:', result);

    // B站API可能用success或errno字段
    const isSuccess = result && (result.success === true || result.errno === 0);
    if (isSuccess && result.data) {
      const list = result.data.list || [];
      console.log('[BG] 实名人列表获取成功:', list.length, '人');
      return list;
    }
    console.error('[BG] 实名人列表API返回错误:', result);
    return [];
  } catch (e) {
    console.error('[BG] 获取实名人列表失败:', e.message, e.stack);
    return [];
  }
}

// ========== 票务信息获取（在页面中发起请求，利用页面登录态） ==========
async function fetchTicketInfo(projectId) {
  console.log('[BG] 获取票务信息, projectId:', projectId);
  try {
    const tab = await getMallTab();
    if (!tab) {
      console.error('[BG] 未找到mall.bilibili.com标签页');
      return null;
    }

    const result = await executeScript(tab.id, (pid) => {
      return new Promise((resolve) => {
        const url = `https://show.bilibili.com/api/ticket/project/getV2?id=${pid}&project_id=${pid}&requestSource=neul-next`;
        fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Referer': 'https://mall.bilibili.com/'
          }
        })
        .then(r => r.text())
        .then(text => {
          try {
            const data = JSON.parse(text);
            resolve(data);
          } catch (e) {
            resolve({ errno: -1, msg: 'JSON解析失败', raw: text.substring(0, 200) });
          }
        })
        .catch(e => {
          resolve({ errno: -1, msg: e.message });
        });
      });
    }, [projectId]);

    console.log('[BG] 票务页面fetch结果:', result);

    // B站API可能用success或errno字段
    const isSuccess = result && (result.success === true || result.errno === 0);
    if (isSuccess && result.data) {
      console.log('[BG] 票务信息获取成功');
      return result.data;
    }
    console.error('[BG] 票务API返回错误:', result);
    return null;
  } catch (e) {
    console.error('[BG] 获取票务信息失败:', e.message, e.stack);
    return null;
  }
}

// ========== 解析票务信息 ==========
function parseTicketInfo(data) {
  if (!data) return null;

  const result = {
    project_id: data.id,
    project_name: data.name,
    screens: []
  };

  const screenList = data.screen_list || [];
  for (const screen of screenList) {
    const screenInfo = {
      screen_id: screen.id,
      screen_name: screen.name,
      tickets: []
    };

    const ticketList = screen.ticket_list || [];
    for (const ticket of ticketList) {
      screenInfo.tickets.push({
        ticket_id: ticket.id,
        desc: ticket.desc,
        price: ticket.price / 100,
        sale_flag: ticket.sale_flag?.display_name || '',
        clickable: ticket.clickable,
        limit_num: ticket.static_limit?.num || 6,
        sale_start: ticket.sale_start,
        anonymous_buy: ticket.anonymous_buy
      });
    }
    result.screens.push(screenInfo);
  }

  return result;
}

// ========== 库存检测（回流模式核心） ==========
// stockStatus: 1=TEMP_SOLD_OUT, 2=SOLD_OUT, 3=HAS_STOCK
const STOCK_STATUS = {
  TEMP_SOLD_OUT: 1,
  SOLD_OUT: 2,
  HAS_STOCK: 3
};

async function checkStock(tabId, config) {
  try {
    const result = await executeScript(tabId, (pid, sid, tid) => {
      return new Promise((resolve) => {
        const url = 'https://show.bilibili.com/api/ticket/stock/check';
        fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Referer': 'https://mall.bilibili.com/'
          },
          body: JSON.stringify({
            projectId: pid,
            skuId: tid,
            screenId: sid
          })
        })
        .then(r => r.text())
        .then(text => {
          try {
            const data = JSON.parse(text);
            resolve(data);
          } catch (e) {
            resolve({ errno: -1, msg: 'JSON解析失败', raw: text.substring(0, 200) });
          }
        })
        .catch(e => {
          resolve({ errno: -1, msg: e.message });
        });
      });
    }, [config.project_id, config.screen_id, config.ticket_id]);

    return result;
  } catch (e) {
    console.error('[BG] 库存检测失败:', e.message);
    return { errno: -1, msg: e.message };
  }
}

// ========== Prep 阶段 ==========
async function runPrep(tabId, config) {
  console.log('[BG] 开始 Prep 阶段');
  globalState.currentPhase = 'prep';

  const { project_id, screen_id, ticket_id, qty } = config;

  // 等待VM就绪
  console.log('[BG] 等待VM就绪...');
  let vmReady = false;
  for (let i = 0; i < 100; i++) {
    try {
      const result = await sendToTab(tabId, 'checkVmReady');
      if (result?.ready) {
        vmReady = true;
        console.log('[BG] VM已就绪');
        break;
      }
    } catch (e) {
      console.warn('[BG] checkVmReady失败:', e.message);
      return { status: 'retry', msg: '标签页可能已关闭' };
    }
    await sleep(100);
  }

  if (!vmReady) {
    console.error('[BG] VM获取超时');
    return { status: 'retry', msg: 'VM未就绪' };
  }

  // 执行prep请求
  console.log('[BG] 执行prep请求...');

  let prepResult;
  try {
    prepResult = await sendToTab(tabId, 'prepRequest', {
      projectId: project_id,
      screenId: screen_id,
      ticketId: ticket_id,
      qty: qty,
      buyerInfo: config.buyer_info_str || ''
    });
  } catch (e) {
    console.warn('[BG] prepRequest失败:', e.message);
    return { status: 'retry', msg: '标签页可能已关闭' };
  }

  console.log('[BG] prep结果:', prepResult);

  if (!prepResult) {
    return { status: 'retry', msg: '无响应' };
  }

  const errno = prepResult.errno;

  // 成功获取token
  if (errno === 0) {
    const token = prepResult.data?.token;
    const ptoken = prepResult.data?.ptoken;
    if (token) {
      let query = `token=${token}&project_id=${project_id}`;
      if (ptoken) query += `&ptoken=${ptoken}`;
      const url = `https://mall.bilibili.com/neul-next/ticket/confirmOrder.html?${query}&noTitleBar=1`;
      return { status: 'success', url };
    }
  }

  // 停止码
  if (PREP_STOP_CODES.has(errno)) {
    return { status: 'stop', msg: `抢票成功 (errno=${errno})` };
  }

  // 结束码
  if (PREP_END_CODES.has(errno)) {
    return { status: 'end', msg: `活动结束 (errno=${errno})` };
  }

  // 刷新库存
  if (PREP_REFRESH_CODES.has(errno)) {
    return { status: 'refresh', msg: `库存不足 (errno=${errno})` };
  }

  // 重新开始
  if (PREP_RESTART_CODES.has(errno)) {
    return { status: 'restart', msg: `需要重新开始 (errno=${errno})` };
  }

  // 重试码
  if (PREP_RETRY_CODES.has(errno)) {
    return { status: 'retry', msg: `需要重试 (errno=${errno})` };
  }

  return { status: 'retry', msg: `未知错误 errno=${errno}` };
}

// ========== Purc 阶段 ==========
async function runPurc(tabId, config) {
  console.log('[BG] 开始 Purc 阶段');
  globalState.currentPhase = 'purc';

  // 等待订单页VM就绪
  console.log('[BG] 等待订单页VM就绪...');
  let vmReady = false;
  for (let i = 0; i < 100; i++) {
    try {
      const result = await sendToTab(tabId, 'checkOrderVmReady');
      if (result?.ready) {
        vmReady = true;
        console.log('[BG] 订单页VM已就绪');
        break;
      }
    } catch (e) {
      console.warn('[BG] checkOrderVmReady失败:', e.message);
      return { status: 'retry', msg: '标签页可能已关闭' };
    }
    await sleep(100);
  }

  if (!vmReady) {
    return { status: 'retry', msg: '订单页VM未就绪' };
  }

  // 执行下单（启动后台循环）
  const options = {
    buyerInfo: config.buyer_info || [],
    contact: config.contact_info,
    clickDelay: config.purc_retry_delay_ms || 250
  };

  if (config.buyer_ids && config.buyer_ids.length > 0) {
    options.buyerIds = config.buyer_ids;
  }

  let startResult;
  try {
    startResult = await sendToTab(tabId, 'submitOrder', options);
  } catch (e) {
    console.warn('[BG] submitOrder失败:', e.message);
    return { status: 'retry', msg: '标签页可能已关闭' };
  }
  console.log('[BG] 下单启动结果:', startResult);

  if (!startResult) {
    return { status: 'retry', msg: '启动下单无响应' };
  }

  if (startResult.status === 'no_vm' || startResult.status === 'no_buyer') {
    return { status: 'end', msg: startResult.error || '购买人信息不足' };
  }

  if (startResult.status !== 'started') {
    return { status: 'retry', msg: '下单启动失败: ' + (startResult.msg || startResult.status) };
  }

  // 后台循环已启动，定期检查状态
  console.log('[BG] 下单循环已启动，开始轮询状态...');
  let checkCount = 0;
  const maxCheckCount = 2000; // 最多检查2000次

  while (checkCount < maxCheckCount && globalState.isRunning) {
    checkCount++;
    await sleep(500); // 每500ms检查一次

    let statusResult;
    try {
      statusResult = await sendToTab(tabId, 'checkOrderStatus');
    } catch (e) {
      console.warn('[BG] checkOrderStatus失败:', e.message);
      return { status: 'retry', msg: '标签页可能已关闭' };
    }
    console.log('[BG] 订单状态检查:', checkCount, statusResult);

    if (!statusResult) {
      continue;
    }

    if (statusResult.status === 'success') {
      return { status: 'success', orderId: statusResult.orderId };
    }

    if (statusResult.status === 'expired') {
      // token过期，需要返回信息页重新prep
      console.log('[BG] token过期，准备重新prep');
      return { status: 'expired', msg: 'token过期' };
    }

    if (statusResult.status === 'stop') {
      // 抢票成功（通过错误码检测到）
      console.log('[BG] 抢票成功！errno:', statusResult.errno);
      return { status: 'stop', msg: statusResult.msg || '抢票成功' };
    }

    if (statusResult.status === 'end') {
      // 活动结束
      console.log('[BG] 活动结束，errno:', statusResult.errno);
      return { status: 'end', msg: statusResult.msg || '活动结束' };
    }

    if (statusResult.status === 'stopped') {
      return { status: 'retry', msg: '循环异常停止' };
    }

    // running - 继续等待
    const attemptCount = statusResult.attempt || 0;
    globalState.attemptCount = attemptCount;
    if (checkCount % 20 === 0) {
      console.log(`[BG] 已等待 ${checkCount * 0.5} 秒，页面已尝试 ${attemptCount} 次`);
    }
  }

  // 循环结束，检查是否因为用户停止
  if (!globalState.isRunning) {
    console.log('[BG] 用户停止抢票，退出Purc轮询');
    return { status: 'stopped', msg: '已停止抢票' };
  }

  return { status: 'retry', msg: 'Purc轮询超时' };
}

// ========== 回流模式：库存检测循环 ==========
async function runResaleMode(config) {
  console.log('[BG] 开始回流模式');
  addLog('进入回流模式，持续监测库存...', 'info');
  globalState.mode = 'resale';
  globalState.currentPhase = 'stock_check';

  let tab = await getMallTab();
  if (!tab) {
    addLog('未找到会员购页面，创建新标签页', 'warn');
    try {
      tab = await chrome.tabs.create({
        url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
        active: true
      });
      await sleep(3000);
    } catch (e) {
      addLog('创建标签页失败: ' + e.message, 'error');
      globalState.isRunning = false;
      notifyEnd('创建标签页失败');
      return;
    }
  } else {
    // 确保在详情页
    try {
      await chrome.tabs.update(tab.id, {
        url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
        active: true
      });
      await sleep(3000);
    } catch (e) {
      addLog('导航到详情页失败: ' + e.message, 'error');
    }
  }

  tab = await getMallTab();
  if (!tab) {
    addLog('无法获取标签页', 'error');
    globalState.isRunning = false;
    notifyEnd('无法获取标签页');
    return;
  }

  const stockCheckDelay = config.stock_check_delay_ms || 500;
  let stockCheckCount = 0;

  // 回流模式主循环：持续检测库存 → 下单 → 失败则返回继续检测
  while (globalState.isRunning) {
    let hasStockFound = false;

    // ===== 阶段1：库存检测循环 =====
    while (globalState.isRunning && !hasStockFound) {
      stockCheckCount++;
      globalState.stockCheckCount = stockCheckCount;

      const stockResult = await checkStock(tab.id, config);
      console.log('[BG] 库存检测:', stockCheckCount, stockResult);

      if (!stockResult) {
        await sleep(stockCheckDelay);
        continue;
      }

      if (stockResult.errno !== 0) {
        addLog(`库存检测API错误: ${stockResult.msg || '未知错误'}`, 'error');
        await sleep(stockCheckDelay);
        continue;
      }

      const stockData = stockResult.data || {};
      const hasStock = stockData.hasStock === true;
      const stockStatus = stockData.stockStatus;
      const unpaidOrderId = stockData.unpaidOrderId;

      // 每2000次检测输出一次日志
      if (stockCheckCount % 2000 === 0) {
        const statusText = stockStatus === STOCK_STATUS.HAS_STOCK ? '有票' :
                          stockStatus === STOCK_STATUS.SOLD_OUT ? '售罄' : '暂时售罄';
        addLog(`已检测库存 ${stockCheckCount} 次，当前状态: ${statusText}`, 'info');
      }

      // 检测到有未支付订单
      if (unpaidOrderId) {
        addLog(`发现未支付订单: ${unpaidOrderId}`, 'success');
        globalState.isRunning = false;
        globalState.orderId = unpaidOrderId;
        notifySuccess(`发现未支付订单: ${unpaidOrderId}`);
        return;
      }

      // 检测到有库存
      if (hasStock || stockStatus === STOCK_STATUS.HAS_STOCK) {
        addLog('检测到库存！开始prepare下单...', 'success');
        hasStockFound = true;
        break;
      }

      // 彻底售罄也继续检测（回流模式核心：票可能再次放出）
      if (stockStatus === STOCK_STATUS.SOLD_OUT) {
        // 每2000次输出一次，避免日志刷屏
        if (stockCheckCount % 2000 === 0) {
          addLog('当前售罄，继续监测...', 'info');
        }
      }

      // 暂时售罄，继续检测
      await sleep(stockCheckDelay);
    }

    if (!globalState.isRunning) {
      addLog('用户停止抢票', 'info');
      return;
    }

    // ===== 阶段2：有库存了，进入prep-purc流程 =====
    addLog('库存 detected，进入下单流程', 'info');
    await runPrepPurcLoop(tab, config);

    // runPrepPurcLoop 返回后，检查是否还在运行
    if (!globalState.isRunning) {
      addLog('抢票流程结束', 'info');
      return;
    }

    // 如果还在运行，说明下单失败了，返回详情页继续检测库存
    addLog('下单流程结束，返回库存检测...', 'info');

    // 确保回到详情页
    tab = await getMallTab();
    if (tab) {
      try {
        await chrome.tabs.update(tab.id, {
          url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
          active: true
        });
        await sleep(2000);
      } catch (e) {
        console.warn('[BG] 返回详情页失败:', e.message);
      }
    } else {
      // 标签页丢失，重新创建
      try {
        tab = await chrome.tabs.create({
          url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
          active: true
        });
        await sleep(3000);
      } catch (e) {
        addLog('重新创建标签页失败', 'error');
        globalState.isRunning = false;
        notifyEnd('标签页操作失败');
        return;
      }
    }

    tab = await getMallTab();
    if (!tab) {
      addLog('无法获取标签页，停止抢票', 'error');
      globalState.isRunning = false;
      notifyEnd('无法获取标签页');
      return;
    }

    // 继续外层while循环，重新检测库存
  }
}

// ========== Prep-Purc 循环（供预售和回流模式复用） ==========
async function runPrepPurcLoop(tab, config) {
  let prepUrl = null;
  let purcCycles = 0;
  const maxPurcCycles = 10;

  // 先执行prep
  let prepAttempts = 0;
  const maxPrepAttempts = 200;

  while (prepAttempts < maxPrepAttempts && globalState.isRunning) {
    prepAttempts++;
    globalState.attemptCount = prepAttempts;

    if (prepAttempts % 20 === 0) {
      addLog(`Prep尝试 ${prepAttempts} 次...`, 'info');
    }

    const result = await runPrep(tab.id, config);

    if (result.status === 'success') {
      prepUrl = result.url;
      break;
    } else if (result.status === 'stop') {
      globalState.isRunning = false;
      notifySuccess(result.msg);
      return;
    } else if (result.status === 'end') {
      globalState.isRunning = false;
      notifyEnd(result.msg);
      return;
    } else if (result.status === 'refresh') {
      await sendToTab(tab.id, 'refreshStock', { projectId: config.project_id });
      await sleep(config.prep_retry_delay_ms || 200);
    } else if (result.status === 'restart') {
      try {
        await chrome.tabs.update(tab.id, {
          url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`
        });
        await sleep(2000);
      } catch (e) {
        console.warn('[BG] 重新加载页面失败:', e.message);
      }
    } else {
      await sleep(config.prep_retry_delay_ms || 200);
    }
  }

  if (!prepUrl) {
    addLog('Prep阶段超时，返回库存检测', 'warn');
    return;
  }

  // Purc循环
  while (purcCycles < maxPurcCycles && globalState.isRunning) {
    purcCycles++;

    // 检查标签页
    tab = await getMallTab();
    if (!tab) {
      addLog('标签页已关闭，重新创建', 'warn');
      try {
        tab = await chrome.tabs.create({
          url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
          active: true
        });
        await sleep(3000);
        tab = await getMallTab();
      } catch (e) {
        addLog('重新创建标签页失败', 'error');
        globalState.isRunning = false;
        notifyEnd('标签页操作失败');
        return;
      }
      prepUrl = null;
      break;
    }

    // 跳转确认订单页
    try {
      await chrome.tabs.update(tab.id, { url: prepUrl });
    } catch (e) {
      console.warn('[BG] 跳转确认订单页失败:', e.message);
    }
    await sleep(2000);

    tab = await getMallTab();
    if (!tab) {
      addLog('标签页丢失，重新创建', 'warn');
      try {
        tab = await chrome.tabs.create({
          url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
          active: true
        });
        await sleep(3000);
        tab = await getMallTab();
      } catch (e) {
        globalState.isRunning = false;
        notifyEnd('标签页操作失败');
        return;
      }
      prepUrl = null;
      break;
    }

    // Purc阶段
    const result = await runPurc(tab.id, config);
    addLog(`Purc结果: ${result.status}`, 'info');

    if (result.status === 'success') {
      globalState.isRunning = false;
      globalState.orderId = result.orderId;
      notifySuccess(`抢票成功！订单号: ${result.orderId}`);
      return;
    } else if (result.status === 'stop') {
      globalState.isRunning = false;
      notifySuccess(result.msg);
      return;
    } else if (result.status === 'end') {
      globalState.isRunning = false;
      notifyEnd(result.msg);
      return;
    } else if (result.status === 'stopped') {
      globalState.isRunning = false;
      notifyEnd(result.msg || '已停止抢票');
      return;
    } else if (result.status === 'expired') {
      await sendToTab(tab.id, 'resetPopupState');
      // 重新prep
      let newPrepAttempts = 0;
      prepUrl = null;
      while (newPrepAttempts < 100 && globalState.isRunning) {
        newPrepAttempts++;
        const prepResult = await runPrep(tab.id, config);
        if (prepResult.status === 'success') {
          prepUrl = prepResult.url;
          break;
        } else if (prepResult.status === 'stop' || prepResult.status === 'end') {
          globalState.isRunning = false;
          if (prepResult.status === 'stop') notifySuccess(prepResult.msg);
          else notifyEnd(prepResult.msg);
          return;
        }
        await sleep(config.prep_retry_delay_ms || 200);
      }
      if (!prepUrl) {
        addLog('重新Prep失败，返回库存检测', 'warn');
        return;
      }
      continue;
    } else if (result.status === 'retry') {
      if (!globalState.isRunning) {
        notifyEnd('已停止抢票');
        return;
      }
      // 返回detail页重新prep
      try {
        await chrome.tabs.update(tab.id, {
          url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`
        });
        await sleep(2000);
      } catch (e) {
        console.warn('[BG] 跳转detail页失败:', e.message);
      }

      let newPrepAttempts = 0;
      prepUrl = null;
      while (newPrepAttempts < 100 && globalState.isRunning) {
        newPrepAttempts++;
        tab = await getMallTab();
        if (!tab) {
          globalState.isRunning = false;
          notifyEnd('标签页已关闭');
          return;
        }
        const prepResult = await runPrep(tab.id, config);
        if (prepResult.status === 'success') {
          prepUrl = prepResult.url;
          break;
        } else if (prepResult.status === 'stop' || prepResult.status === 'end') {
          globalState.isRunning = false;
          if (prepResult.status === 'stop') notifySuccess(prepResult.msg);
          else notifyEnd(prepResult.msg);
          return;
        }
        await sleep(config.prep_retry_delay_ms || 200);
      }

      if (!globalState.isRunning) {
        notifyEnd('已停止抢票');
        return;
      }
      if (!prepUrl) {
        addLog('重新Prep失败，返回库存检测', 'warn');
        return;
      }
      continue;
    } else {
      globalState.isRunning = false;
      notifyEnd('Purc阶段结束: ' + result.msg);
      return;
    }
  }

  if (purcCycles >= maxPurcCycles) {
    addLog('Purc循环次数超限，返回库存检测', 'warn');
  }
}

// ========== 预售模式主流程 ==========
async function runPresaleMode(config) {
  console.log('[BG] 开始预售模式');
  addLog('进入预售模式', 'info');
  globalState.mode = 'presale';

  let tab = await getMallTab();
  if (!tab) {
    addLog('未找到会员购页面，创建新标签页', 'warn');
    try {
      tab = await chrome.tabs.create({
        url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
        active: true
      });
      await sleep(3000);
    } catch (e) {
      addLog('创建标签页失败: ' + e.message, 'error');
      globalState.isRunning = false;
      notifyEnd('创建标签页失败');
      return;
    }
  } else {
    try {
      await chrome.tabs.update(tab.id, {
        url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
        active: true
      });
      await sleep(3000);
    } catch (e) {
      addLog('导航到详情页失败: ' + e.message, 'error');
    }
  }

  tab = await getMallTab();
  if (!tab) {
    addLog('无法获取标签页', 'error');
    globalState.isRunning = false;
    notifyEnd('无法获取标签页');
    return;
  }

  // 预售模式直接进入prep-purc循环
  await runPrepPurcLoop(tab, config);

  // 如果还在运行（prep-purc因为某些原因退出了但没有结束），继续循环
  while (globalState.isRunning) {
    // 检查是否超过30分钟
    const elapsed = Date.now() - globalState.startTime;
    if (elapsed > 30 * 60 * 1000) {
      addLog('预售模式已运行30分钟，自动切换至回流模式', 'warn');
      await runResaleMode(config);
      return;
    }

    addLog('预售模式继续尝试...', 'info');
    await sleep(1000);

    // 重新获取tab并继续
    tab = await getMallTab();
    if (!tab) {
      try {
        tab = await chrome.tabs.create({
          url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
          active: true
        });
        await sleep(3000);
        tab = await getMallTab();
      } catch (e) {
        addLog('重新创建标签页失败', 'error');
        globalState.isRunning = false;
        notifyEnd('标签页操作失败');
        return;
      }
    }

    await runPrepPurcLoop(tab, config);
  }
}

// ========== 主抢票流程 ==========
async function startTicketProcess(config) {
  if (globalState.isRunning) {
    console.log('[BG] 抢票已在运行中');
    return;
  }

  globalState.isRunning = true;
  globalState.config = config;
  globalState.currentPhase = 'idle';
  globalState.lastError = null;
  globalState.orderId = null;
  globalState.attemptCount = 0;
  globalState.stockCheckCount = 0;
  globalState.startTime = Date.now();
  clearLogs();

  const mode = config.grab_mode || 'presale';
  addLog(`开始抢票流程 [模式: ${mode === 'presale' ? '预售' : '回流'}]`, 'info');

  try {
    if (mode === 'resale') {
      await runResaleMode(config);
    } else {
      await runPresaleMode(config);
    }
  } catch (e) {
    console.error('[BG] 抢票流程异常:', e);
    addLog(`抢票流程异常: ${e.message}`, 'error');
    globalState.isRunning = false;
    globalState.lastError = e.message;
    notifyEnd(`异常: ${e.message}`);
  }

  globalState.isRunning = false;
  globalState.currentPhase = 'idle';
  addLog('抢票流程已结束', 'info');
}

async function stopTicketProcess() {
  console.log('[BG] 停止抢票');
  addLog('正在停止抢票...', 'info');
  globalState.isRunning = false;

  // 尝试通知页面停止purc循环
  try {
    const tab = await getMallTab();
    if (tab) {
      await sendToTab(tab.id, 'stopPurc');
    }
  } catch (e) {
    // 忽略
  }
}

// ========== 通知 ==========
function notifySuccess(msg) {
  try {
    if (chrome.notifications) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: '🎉 抢票成功！',
        message: msg
      });
    }
  } catch (e) {
    console.warn('[BG] 通知失败:', e.message);
  }
}

function notifyEnd(msg) {
  try {
    if (chrome.notifications) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: '抢票结束',
        message: msg
      });
    }
  } catch (e) {
    console.warn('[BG] 通知失败:', e.message);
  }
}

// ========== 定时抢票 ==========
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'ticketTimer') {
    console.log('[BG] 定时器触发，开始抢票');
    const config = await getStorage('ticketConfig');
    if (config) {
      await startTicketProcess(config);
    }
  }
});

// ========== 消息处理 ==========
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    try {
      switch (request.action) {
        case 'getState':
          sendResponse(globalState);
          break;

        case 'startTicket':
          const config = request.config;
          await setStorage('ticketConfig', config);

          // 如果有定时设置
          if (config.use_timer && config.target_time) {
            const targetTime = new Date(config.target_time).getTime();
            const advanceMs = (config.advance_seconds || 0.4) * 1000;
            const alarmTime = targetTime - advanceMs;
            const now = Date.now();

            if (alarmTime > now) {
              console.log('[BG] 设置定时抢票:', new Date(alarmTime));
              chrome.alarms.create('ticketTimer', { when: alarmTime });
              sendResponse({ success: true, msg: `已设置定时抢票: ${new Date(targetTime).toLocaleString()}` });
            } else {
              // 时间已过，立即开始
              startTicketProcess(config);
              sendResponse({ success: true, msg: '目标时间已过，立即开始抢票' });
            }
          } else {
            // 立即开始
            startTicketProcess(config);
            sendResponse({ success: true, msg: '已开始抢票' });
          }
          break;

        case 'stopTicket':
          stopTicketProcess();
          chrome.alarms.clear('ticketTimer');
          sendResponse({ success: true });
          break;

        case 'fetchBuyers':
          const buyers = await fetchBuyerList(request.projectId);
          sendResponse({ buyers });
          break;

        case 'fetchTicketInfo':
          const ticketData = await fetchTicketInfo(request.projectId);
          const parsed = parseTicketInfo(ticketData);
          sendResponse({ data: ticketData, parsed });
          break;

        case 'clearTimer':
          chrome.alarms.clear('ticketTimer');
          sendResponse({ success: true });
          break;

        default:
          sendResponse({ error: '未知操作' });
      }
    } catch (err) {
      console.error('[BG] 消息处理异常:', err);
      sendResponse({ error: err.message || '后台处理异常' });
    }
  })();

  return true; // 保持消息通道开放
});

console.log('[BG] Service Worker 已加载');
