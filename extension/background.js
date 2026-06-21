// ===== Background Service Worker =====
// 职责：定时抢票调度、实名人获取、网络请求监听、跨页面状态管理

import { PREP_STOP_CODES, PREP_END_CODES, PREP_RETRY_CODES, PREP_REFRESH_CODES, PREP_RESTART_CODES, PURC_STOP_CODES, PURC_END_CODES } from './consts.js';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ========== 状态管理 ==========
let globalState = {
  isRunning: false,
  config: null,
  currentPhase: 'idle', // idle | prep | purc
  lastError: null,
  orderId: null,
  attemptCount: 0
};

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

// ========== 网络请求监听（用于捕获prep和purc响应） ==========
let requestListeners = new Map();

function setupRequestListener(tabId, urlPattern, timeout = 10000) {
  return new Promise((resolve) => {
    const listener = (details) => {
      if (details.tabId === tabId && details.url.includes(urlPattern)) {
        chrome.webRequest.onCompleted.removeListener(listener);
        requestListeners.delete(tabId);
        resolve(details);
      }
    };

    chrome.webRequest.onCompleted.addListener(
      listener,
      { urls: ['*://show.bilibili.com/api/ticket/order/*'] }
    );

    requestListeners.set(tabId, listener);

    setTimeout(() => {
      chrome.webRequest.onCompleted.removeListener(listener);
      requestListeners.delete(tabId);
      resolve(null);
    }, timeout);
  });
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
    if (checkCount % 20 === 0) {
      const attemptCount = statusResult.attempt || 0;
      console.log(`[BG] 已等待 ${checkCount * 0.5} 秒，页面已尝试 ${attemptCount} 次`);
      // 更新全局状态，让popup可以显示
      globalState.attemptCount = attemptCount;
    }
  }

  // 循环结束，检查是否因为用户停止
  if (!globalState.isRunning) {
    console.log('[BG] 用户停止抢票，退出Purc轮询');
    return { status: 'stopped', msg: '已停止抢票' };
  }

  return { status: 'retry', msg: 'Purc轮询超时' };
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

  console.log('[BG] 开始抢票流程', config);

  try {
    // 1. 打开或获取详情页标签页
    let tab = await getMallTab();
    if (!tab) {
      console.log('[BG] 创建新标签页');
      try {
        tab = await chrome.tabs.create({
          url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
          active: true
        });
      } catch (e) {
        console.error('[BG] 创建标签页失败:', e.message);
        globalState.isRunning = false;
        notifyEnd('创建标签页失败: ' + e.message);
        return;
      }
      await sleep(3000); // 等待页面加载
    } else {
      // 导航到详情页
      try {
        await chrome.tabs.update(tab.id, {
          url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
          active: true
        });
      } catch (e) {
        console.error('[BG] 导航到详情页失败:', e.message);
        globalState.isRunning = false;
        notifyEnd('导航失败: ' + e.message);
        return;
      }
      await sleep(3000);
    }

    // 重新获取tab
    tab = await getMallTab();
    if (!tab) {
      console.error('[BG] 无法获取mall.bilibili.com标签页');
      globalState.isRunning = false;
      notifyEnd('无法获取标签页');
      return;
    }

    // 2. Prep阶段
    let prepUrl = null;
    let prepAttempts = 0;
    const maxPrepAttempts = 500;

    while (prepAttempts < maxPrepAttempts && globalState.isRunning) {
      prepAttempts++;
      globalState.attemptCount = prepAttempts;

      // 每20次prep输出日志
      if (prepAttempts % 20 === 0) {
        console.log(`[BG] 已尝试Prep ${prepAttempts} 次`);
      }

      const result = await runPrep(tab.id, config);
      console.log(`[BG] Prep尝试 ${prepAttempts}:`, result.status);

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
        // 刷新库存
        await sendToTab(tab.id, 'refreshStock', { projectId: config.project_id });
        await sleep(config.prep_retry_delay_ms || 200);
      } else if (result.status === 'restart') {
        // 重新加载页面
        try {
          await chrome.tabs.update(tab.id, {
            url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`
          });
          await sleep(2000);
        } catch (e) {
          console.warn('[BG] 重新加载页面失败:', e.message);
          // 标签页可能已关闭，尝试重新获取
          tab = await getMallTab();
          if (!tab) {
            console.log('[BG] 标签页已关闭，重新创建');
            try {
              tab = await chrome.tabs.create({
                url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
                active: true
              });
              await sleep(3000);
            } catch (createErr) {
              console.error('[BG] 创建标签页失败:', createErr.message);
              globalState.isRunning = false;
              notifyEnd('标签页操作失败');
              return;
            }
            tab = await getMallTab();
            if (!tab) {
              globalState.isRunning = false;
              notifyEnd('无法获取标签页');
              return;
            }
          }
        }
      } else {
        // retry
        await sleep(config.prep_retry_delay_ms || 200);
      }
    }

    if (!prepUrl) {
      globalState.isRunning = false;
      notifyEnd('Prep阶段超时');
      return;
    }

    // 3-4. Prep-Purc循环（支持token过期后重新prep）
    let purcCycles = 0;
    const maxPurcCycles = 10; // 最多重新prep 10次

    while (purcCycles < maxPurcCycles && globalState.isRunning) {
      purcCycles++;

      // 检查标签页是否还存在
      tab = await getMallTab();
      if (!tab) {
        console.log('[BG] 标签页已关闭，重新创建');
        tab = await chrome.tabs.create({
          url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
          active: true
        });
        await sleep(3000);
        // 重新获取tab
        tab = await getMallTab();
        if (!tab) {
          throw new Error('重新创建标签页失败');
        }
        // 标签页刚创建，需要重新prep
        prepUrl = null;
        break; // 跳出purc循环，进入重新prep
      }

      // 跳转到确认订单页
      console.log(`[BG] 第${purcCycles}次跳转确认订单页:`, prepUrl);
      try {
        await chrome.tabs.update(tab.id, { url: prepUrl });
      } catch (e) {
        console.warn('[BG] 跳转确认订单页失败:', e.message);
        // 标签页可能已关闭，尝试重新创建
        tab = null;
      }
      await sleep(2000);

      // 重新获取tab
      if (!tab) {
        tab = await getMallTab();
      }
      if (!tab) {
        console.log('[BG] 标签页已关闭，重新创建');
        try {
          tab = await chrome.tabs.create({
            url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`,
            active: true
          });
          await sleep(3000);
        } catch (e) {
          console.error('[BG] 创建标签页失败:', e.message);
          globalState.isRunning = false;
          notifyEnd('标签页操作失败');
          return;
        }
        // 重新获取tab
        tab = await getMallTab();
        if (!tab) {
          globalState.isRunning = false;
          notifyEnd('无法获取标签页');
          return;
        }
        // 标签页刚创建，需要重新prep
        prepUrl = null;
        break; // 跳出purc循环，进入重新prep
      }

      // Purc阶段
      const result = await runPurc(tab.id, config);
      console.log('[BG] Purc最终结果:', result.status);

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
        // 用户手动停止
        globalState.isRunning = false;
        notifyEnd(result.msg || '已停止抢票');
        return;
      } else if (result.status === 'expired') {
        // token过期，需要重新prep
        console.log('[BG] token过期，返回信息页重新prep');

        // 停止当前purc循环
        await sendToTab(tab.id, 'resetPopupState');

        // 重新执行prep
        let newPrepAttempts = 0;
        const maxNewPrepAttempts = 100;
        prepUrl = null;

        while (newPrepAttempts < maxNewPrepAttempts && globalState.isRunning) {
          newPrepAttempts++;

          const prepResult = await runPrep(tab.id, config);
          console.log(`[BG] 重新Prep尝试 ${newPrepAttempts}:`, prepResult.status);

          if (prepResult.status === 'success') {
            prepUrl = prepResult.url;
            break;
          } else if (prepResult.status === 'stop') {
            globalState.isRunning = false;
            notifySuccess(prepResult.msg);
            return;
          } else if (prepResult.status === 'end') {
            globalState.isRunning = false;
            notifyEnd(prepResult.msg);
            return;
          } else if (prepResult.status === 'refresh') {
            await sendToTab(tab.id, 'refreshStock', { projectId: config.project_id });
            await sleep(config.prep_retry_delay_ms || 200);
          } else if (prepResult.status === 'restart') {
            await chrome.tabs.update(tab.id, {
              url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`
            });
            await sleep(2000);
          } else {
            await sleep(config.prep_retry_delay_ms || 200);
          }
        }

        if (!prepUrl) {
          globalState.isRunning = false;
          notifyEnd('重新Prep阶段超时');
          return;
        }

        // 继续外层循环，用新的prepUrl跳转
        continue;
      } else if (result.status === 'retry') {
        // 超时或其他可重试错误，返回detail页重新prepare
        // 先检查用户是否已手动停止
        if (!globalState.isRunning) {
          console.log('[BG] 用户已停止抢票，退出');
          globalState.isRunning = false;
          notifyEnd('已停止抢票');
          return;
        }

        console.log('[BG] Purc超时/错误，返回detail页重新prepare');

        // 检查标签页是否还存在
        tab = await getMallTab();
        if (tab) {
          // 导航回detail页
          try {
            await chrome.tabs.update(tab.id, {
              url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`
            });
            await sleep(2000);
          } catch (e) {
            console.warn('[BG] 跳转detail页失败:', e.message);
          }
        }

        // 重新执行prep
        let newPrepAttempts = 0;
        const maxNewPrepAttempts = 100;
        prepUrl = null;

        while (newPrepAttempts < maxNewPrepAttempts && globalState.isRunning) {
          newPrepAttempts++;

          // 检查标签页是否还存在
          tab = await getMallTab();
          if (!tab) {
            console.log('[BG] 标签页已关闭，停止抢票');
            globalState.isRunning = false;
            notifyEnd('标签页已关闭');
            return;
          }

          const prepResult = await runPrep(tab.id, config);
          console.log(`[BG] 超时后重新Prep尝试 ${newPrepAttempts}:`, prepResult.status);

          if (prepResult.status === 'success') {
            prepUrl = prepResult.url;
            break;
          } else if (prepResult.status === 'stop') {
            globalState.isRunning = false;
            notifySuccess(prepResult.msg);
            return;
          } else if (prepResult.status === 'end') {
            globalState.isRunning = false;
            notifyEnd(prepResult.msg);
            return;
          } else if (prepResult.status === 'refresh') {
            await sendToTab(tab.id, 'refreshStock', { projectId: config.project_id });
            await sleep(config.prep_retry_delay_ms || 200);
          } else if (prepResult.status === 'restart') {
            try {
              await chrome.tabs.update(tab.id, {
                url: `https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=${config.project_id}&noTitleBar=1`
              });
              await sleep(2000);
            } catch (e) {
              console.warn('[BG] 跳转detail页失败:', e.message);
            }
          } else {
            await sleep(config.prep_retry_delay_ms || 200);
          }
        }

        if (!globalState.isRunning) {
          console.log('[BG] 用户已停止抢票，退出');
          notifyEnd('已停止抢票');
          return;
        }

        if (!prepUrl) {
          globalState.isRunning = false;
          notifyEnd('超时后重新Prep失败');
          return;
        }

        // 继续外层循环，用新的prepUrl跳转
        continue;
      } else {
        // 其他错误，结束抢票
        globalState.isRunning = false;
        notifyEnd('Purc阶段结束: ' + result.msg);
        return;
      }
    }

    globalState.isRunning = false;
    notifyEnd('Purc循环次数超限');

  } catch (e) {
    console.error('[BG] 抢票流程异常:', e);
    globalState.isRunning = false;
    globalState.lastError = e.message;
    notifyEnd(`异常: ${e.message}`);
  }
}

async function stopTicketProcess() {
  console.log('[BG] 停止抢票');
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
