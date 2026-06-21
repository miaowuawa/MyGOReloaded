// ===== Popup Script =====
// 职责：提供用户界面，配置抢票参数，与background通信

// ========== DOM元素 ==========
const els = {
  projectId: document.getElementById('projectId'),
  btnFetchInfo: document.getElementById('btnFetchInfo'),
  ticketInfo: document.getElementById('ticketInfo'),
  projectName: document.getElementById('projectName'),
  screenSelect: document.getElementById('screenSelect'),
  ticketSelect: document.getElementById('ticketSelect'),
  ticketPrice: document.getElementById('ticketPrice'),
  ticketLimit: document.getElementById('ticketLimit'),
  qty: document.getElementById('qty'),

  btnFetchBuyers: document.getElementById('btnFetchBuyers'),
  buyerList: document.getElementById('buyerList'),
  buyerInfoManual: document.getElementById('buyerInfoManual'),
  btnParseBuyerJson: document.getElementById('btnParseBuyerJson'),
  realNameHint: document.getElementById('realNameHint'),

  contactSection: document.getElementById('contactSection'),
  contactName: document.getElementById('contactName'),
  contactPhone: document.getElementById('contactPhone'),
  contactBadge: document.getElementById('contactBadge'),
  contactHint: document.getElementById('contactHint'),

  useTimer: document.getElementById('useTimer'),
  timerGroup: document.getElementById('timerGroup'),
  targetTime: document.getElementById('targetTime'),
  advanceSeconds: document.getElementById('advanceSeconds'),

  prepDelay: document.getElementById('prepDelay'),
  purcDelay: document.getElementById('purcDelay'),

  btnStart: document.getElementById('btnStart'),
  btnStop: document.getElementById('btnStop'),

  statusDot: document.getElementById('statusDot'),
  statusText: document.getElementById('statusText'),
  logContainer: document.getElementById('logContainer')
};

// ========== 状态 ==========
let ticketData = null;
let buyerData = [];
let selectedBuyerIds = [];
let isRunning = false;

// ========== 日志 ==========
function log(msg, type = 'info') {
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  const time = new Date().toLocaleTimeString();
  entry.textContent = `[${time}] ${msg}`;
  els.logContainer.appendChild(entry);
  els.logContainer.scrollTop = els.logContainer.scrollHeight;
}

// ========== 状态更新 ==========
function updateStatus(status, text) {
  els.statusDot.className = 'status-dot ' + status;
  els.statusText.textContent = text;
}

// ========== 发送消息到background ==========
function sendMessage(action, data = {}) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action, ...data }, (response) => {
      resolve(response);
    });
  });
}

// ========== 获取票务信息 ==========
els.btnFetchInfo.addEventListener('click', async () => {
  const projectId = els.projectId.value.trim();
  if (!projectId) {
    log('请输入项目ID', 'error');
    return;
  }

  log(`正在获取项目 ${projectId} 的票务信息...`);
  els.btnFetchInfo.disabled = true;

  try {
    const response = await sendMessage('fetchTicketInfo', { projectId });
    console.log('[Popup] fetchTicketInfo 响应:', response);

    if (response?.error) {
      log(`获取票务信息失败: ${response.error}`, 'error');
    } else if (response?.parsed) {
      ticketData = response.parsed;
      renderTicketInfo(ticketData);
      log('票务信息获取成功', 'success');
    } else {
      log('获取票务信息失败: 无数据返回', 'error');
      if (response?.data === null) {
        log('可能原因: 未打开B站会员购页面、未登录、项目ID错误或网络问题', 'warn');
      }
    }
  } catch (e) {
    log(`获取票务信息异常: ${e.message}`, 'error');
  }

  els.btnFetchInfo.disabled = false;
});

function renderTicketInfo(data) {
  els.projectName.textContent = data.project_name || '未知项目';
  els.ticketInfo.classList.remove('hidden');

  // 渲染场次
  els.screenSelect.innerHTML = '';
  for (const screen of data.screens) {
    const option = document.createElement('option');
    option.value = screen.screen_id;
    option.textContent = screen.screen_name;
    els.screenSelect.appendChild(option);
  }

  // 渲染票种
  updateTicketSelect();

  // 场次切换时更新票种
  els.screenSelect.addEventListener('change', updateTicketSelect);
}

function updateTicketSelect() {
  const screenId = parseInt(els.screenSelect.value);
  const screen = ticketData.screens.find(s => s.screen_id === screenId);
  if (!screen) return;

  els.ticketSelect.innerHTML = '';
  for (const ticket of screen.tickets) {
    const option = document.createElement('option');
    option.value = ticket.ticket_id;
    option.textContent = `${ticket.desc} - ¥${ticket.price} (${ticket.sale_flag || '未知状态'})`;
    els.ticketSelect.appendChild(option);
  }

  updateTicketDetail();
  els.ticketSelect.addEventListener('change', updateTicketDetail);
}

function updateTicketDetail() {
  const screenId = parseInt(els.screenSelect.value);
  const ticketId = parseInt(els.ticketSelect.value);
  const screen = ticketData.screens.find(s => s.screen_id === screenId);
  if (!screen) return;

  const ticket = screen.tickets.find(t => t.ticket_id === ticketId);
  if (ticket) {
    els.ticketPrice.textContent = `¥${ticket.price}`;
    els.ticketLimit.textContent = ticket.limit_num;

    // 更新实名制和联系人提示
    updateRealNameHint(ticket);
  }
}

function updateRealNameHint(ticket) {
  if (!ticket) return;

  // anonymous_buy === 1: 匿名购买（不需要实名制，但需要联系人）
  // anonymous_buy !== 1: 实名制（需要实名人，不需要联系人）
  const isAnonymous = ticket.anonymous_buy === 1;

  // 实名人信息提示
  if (isAnonymous) {
    els.realNameHint.textContent = '该票种为匿名购买，无需实名人信息';
    els.realNameHint.style.borderLeftColor = '#52c41a';
  } else {
    els.realNameHint.textContent = '该票种需要实名制，请选择或填写实名人信息';
    els.realNameHint.style.borderLeftColor = '#ff6b6b';
  }

  // 联系人信息提示
  if (isAnonymous) {
    // 匿名购买：需要联系人
    els.contactSection.classList.remove('hidden');
    els.contactBadge.textContent = '必填';
    els.contactBadge.classList.remove('optional');
    els.contactHint.textContent = '匿名购买需要填写联系人信息';
  } else {
    // 实名制：不需要联系人
    els.contactSection.classList.add('hidden');
  }
}

// ========== 获取实名人 ==========
els.btnFetchBuyers.addEventListener('click', async () => {
  const projectId = els.projectId.value.trim();
  if (!projectId) {
    log('请先输入项目ID', 'error');
    return;
  }

  log('正在获取实名人列表...');
  els.btnFetchBuyers.disabled = true;

  try {
    const response = await sendMessage('fetchBuyers', { projectId });
    console.log('[Popup] fetchBuyers 响应:', response);

    if (response?.error) {
      log(`获取实名人失败: ${response.error}`, 'error');
    } else if (response?.buyers && response.buyers.length > 0) {
      buyerData = response.buyers;
      renderBuyerList(buyerData);
      log(`成功获取 ${buyerData.length} 位实名人`, 'success');
    } else {
      log('未获取到实名人列表，可能未打开B站会员购页面、未登录或项目ID错误', 'warn');
    }
  } catch (e) {
    log(`获取实名人异常: ${e.message}`, 'error');
  }

  els.btnFetchBuyers.disabled = false;
});

function renderBuyerList(buyers) {
  els.buyerList.innerHTML = '';
  selectedBuyerIds = [];

  for (const buyer of buyers) {
    const item = document.createElement('div');
    item.className = 'buyer-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `buyer_${buyer.id}`;
    checkbox.value = buyer.id;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        selectedBuyerIds.push(buyer.id);
      } else {
        selectedBuyerIds = selectedBuyerIds.filter(id => id !== buyer.id);
      }
      saveFormState();
    });

    const label = document.createElement('label');
    label.htmlFor = `buyer_${buyer.id}`;
    label.textContent = `${buyer.name} (${maskIdCard(buyer.personal_id)})`;

    item.appendChild(checkbox);
    item.appendChild(label);
    els.buyerList.appendChild(item);
  }
}

function restoreBuyerCheckboxes() {
  if (!selectedBuyerIds || selectedBuyerIds.length === 0) return;
  for (const id of selectedBuyerIds) {
    const cb = document.getElementById(`buyer_${id}`);
    if (cb) cb.checked = true;
  }
}

function maskIdCard(idCard) {
  if (!idCard || idCard.length < 8) return idCard;
  return idCard.slice(0, 3) + '****' + idCard.slice(-4);
}

// ========== 解析手动输入的JSON ==========
els.btnParseBuyerJson.addEventListener('click', () => {
  const manualText = els.buyerInfoManual.value.trim();
  if (!manualText) {
    log('请先输入JSON内容', 'error');
    return;
  }

  try {
    const parsed = JSON.parse(manualText);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      log('JSON格式错误：需要非空数组', 'error');
      return;
    }

    // 校验每个元素必须有name字段
    for (const item of parsed) {
      if (!item.name) {
        log('JSON格式错误：每个对象必须包含name字段', 'error');
        return;
      }
    }

    // 给手动解析的buyer分配临时负数id，与API获取的区分开
    const manualBuyers = parsed.map((item, idx) => ({
      id: -(idx + 1),
      name: item.name,
      personal_id: item.idCard || item.personal_id || '',
      tel: item.phone || item.tel || '',
      _manual: true
    }));

    buyerData = manualBuyers;
    renderBuyerList(manualBuyers);
    log(`JSON解析成功，已加载 ${manualBuyers.length} 位实名人`, 'success');
  } catch (e) {
    log(`JSON解析失败: ${e.message}`, 'error');
  }
});

// ========== 定时设置 ==========
els.useTimer.addEventListener('change', () => {
  els.timerGroup.style.display = els.useTimer.checked ? 'block' : 'none';
});
els.timerGroup.style.display = 'none';

// ========== 开始抢票 ==========
els.btnStart.addEventListener('click', async () => {
  const config = buildConfig();
  if (!config) return;

  log('开始抢票...');
  updateStatus('running', '抢票中...');
  isRunning = true;
  updateButtons();

  try {
    const response = await sendMessage('startTicket', { config });
    if (response?.success) {
      log(response.msg, 'success');
    } else {
      log(response?.msg || '启动失败', 'error');
      isRunning = false;
      updateButtons();
    }
  } catch (e) {
    log(`启动异常: ${e.message}`, 'error');
    isRunning = false;
    updateButtons();
  }
});

// ========== 停止抢票 ==========
els.btnStop.addEventListener('click', async () => {
  log('停止抢票...');

  try {
    await sendMessage('stopTicket');
    isRunning = false;
    updateStatus('ready', '已停止');
    updateButtons();
    log('已停止抢票');
  } catch (e) {
    log(`停止异常: ${e.message}`, 'error');
  }
});

// ========== 构建配置 ==========
function buildConfig() {
  const projectId = els.projectId.value.trim();
  if (!projectId) {
    log('请输入项目ID', 'error');
    return null;
  }

  let screenId, ticketId;
  let currentTicket = null;
  if (ticketData) {
    screenId = parseInt(els.screenSelect.value);
    ticketId = parseInt(els.ticketSelect.value);
    const screen = ticketData.screens.find(s => s.screen_id === screenId);
    if (screen) {
      currentTicket = screen.tickets.find(t => t.ticket_id === ticketId);
    }
  } else {
    log('请先获取票务信息', 'error');
    return null;
  }

  const qty = parseInt(els.qty.value) || 1;

  // 实名人信息
  let buyerIds = [];
  let buyerInfo = [];

  if (selectedBuyerIds.length > 0) {
    buyerIds = selectedBuyerIds;
  } else {
    // 尝试解析手动输入
    const manualText = els.buyerInfoManual.value.trim();
    if (manualText) {
      try {
        buyerInfo = JSON.parse(manualText);
      } catch (e) {
        log('手动输入的JSON格式错误', 'error');
        return null;
      }
    }
  }

  // anonymous_buy === 1: 匿名购买（不需要实名制，但需要联系人）
  // anonymous_buy !== 1: 实名制（需要实名人，不需要联系人）
  const isAnonymous = currentTicket && currentTicket.anonymous_buy === 1;

  // 实名制检查
  if (!isAnonymous && buyerIds.length === 0 && buyerInfo.length === 0) {
    log('该票种需要实名制，请选择或填写实名人信息', 'error');
    return null;
  }

  // 联系人信息（匿名购买时才需要）
  let contactInfo = null;
  if (isAnonymous) {
    const contactName = els.contactName.value.trim();
    const contactPhone = els.contactPhone.value.trim();
    if (!contactName || !contactPhone) {
      log('匿名购买需要填写联系人信息', 'error');
      return null;
    }
    contactInfo = { name: contactName, phone: contactPhone };
  }

  // 下单延迟最小值限制
  let purcDelay = parseInt(els.purcDelay.value) || 600;
  if (purcDelay < 600) {
    purcDelay = 600;
    els.purcDelay.value = 600;
    log('下单延迟已调整为最小值 600ms', 'warn');
  }

  // 定时设置
  let useTimer = els.useTimer.checked;
  let targetTime = null;
  if (useTimer && els.targetTime.value) {
    targetTime = new Date(els.targetTime.value).toISOString();
  }

  return {
    project_id: projectId,
    screen_id: screenId,
    ticket_id: ticketId,
    qty: qty,
    buyer_ids: buyerIds,
    buyer_info: buyerInfo,
    contact_info: contactInfo,
    use_timer: useTimer,
    target_time: targetTime,
    advance_seconds: parseFloat(els.advanceSeconds.value) || 0.4,
    prep_retry_delay_ms: parseInt(els.prepDelay.value) || 200,
    purc_retry_delay_ms: purcDelay
  };
}

// ========== 按钮状态 ==========
function updateButtons() {
  els.btnStart.disabled = isRunning;
  els.btnStop.disabled = !isRunning;
}

// 上次记录的尝试次数
let lastLoggedAttemptCount = 0;

// ========== 轮询状态 ==========
async function pollState() {
  try {
    const state = await sendMessage('getState');
    if (state) {
      if (state.isRunning && !isRunning) {
        isRunning = true;
        updateButtons();
        updateStatus('running', '抢票中...');
      } else if (!state.isRunning && isRunning) {
        isRunning = false;
        updateButtons();
        updateStatus('ready', '就绪');
      }

      // 显示尝试次数（每20次输出一次到日志）
      if (state.attemptCount > 0 && state.attemptCount >= lastLoggedAttemptCount + 20) {
        log(`已尝试下单 ${state.attemptCount} 次`, 'info');
        lastLoggedAttemptCount = state.attemptCount;
      }

      if (state.orderId) {
        log(`订单号: ${state.orderId}`, 'success');
        updateStatus('success', '抢票成功！');
      }

      if (state.lastError) {
        log(`错误: ${state.lastError}`, 'error');
        updateStatus('error', '出错');
      }
    }
  } catch (e) {
    // 忽略
  }
}

// 每2秒轮询一次状态
setInterval(pollState, 2000);

// ========== 状态持久化 ==========
async function saveFormState() {
  try {
    const formData = {
      projectId: els.projectId.value,
      qty: els.qty.value,
      buyerInfoManual: els.buyerInfoManual.value,
      contactName: els.contactName.value,
      contactPhone: els.contactPhone.value,
      useTimer: els.useTimer.checked,
      targetTime: els.targetTime.value,
      advanceSeconds: els.advanceSeconds.value,
      prepDelay: els.prepDelay.value,
      purcDelay: els.purcDelay.value,
      selectedBuyerIds: selectedBuyerIds,
      timestamp: Date.now()
    };
    await chrome.storage.local.set({ popupFormData: formData });
  } catch (e) {
    console.warn('[Popup] 保存表单状态失败:', e);
  }
}

async function restoreFormState() {
  try {
    const result = await chrome.storage.local.get('popupFormData');
    const formData = result.popupFormData;
    
    if (!formData) {
      log('无历史表单数据');
      return false;
    }
    
    // 检查数据是否过期（超过1小时）
    if (Date.now() - formData.timestamp > 3600000) {
      log('历史表单数据已过期，已清除');
      await chrome.storage.local.remove('popupFormData');
      return false;
    }
    
    // 恢复表单字段
    if (formData.projectId) els.projectId.value = formData.projectId;
    if (formData.qty) els.qty.value = formData.qty;
    if (formData.buyerInfoManual) els.buyerInfoManual.value = formData.buyerInfoManual;
    if (formData.contactName) els.contactName.value = formData.contactName;
    if (formData.contactPhone) els.contactPhone.value = formData.contactPhone;
    if (formData.useTimer) {
      els.useTimer.checked = formData.useTimer;
      els.timerGroup.style.display = formData.useTimer ? 'block' : 'none';
    }
    if (formData.targetTime) els.targetTime.value = formData.targetTime;
    if (formData.advanceSeconds) els.advanceSeconds.value = formData.advanceSeconds;
    if (formData.prepDelay) els.prepDelay.value = formData.prepDelay;
    if (formData.purcDelay) els.purcDelay.value = formData.purcDelay;
    if (formData.selectedBuyerIds) selectedBuyerIds = formData.selectedBuyerIds;
    
    // 如果有保存的buyer数据，渲染列表
    if (formData.buyerData && formData.buyerData.length > 0) {
      buyerData = formData.buyerData;
      renderBuyerList(buyerData);
      restoreBuyerCheckboxes();
    }
    
    log('已恢复历史表单数据', 'success');
    return true;
  } catch (e) {
    console.warn('[Popup] 恢复表单状态失败:', e);
    return false;
  }
}

// 监听表单变化，自动保存
function setupAutoSave() {
  const saveFields = [
    els.projectId, els.qty, els.buyerInfoManual,
    els.contactName, els.contactPhone, els.targetTime,
    els.advanceSeconds, els.prepDelay, els.purcDelay
  ];
  
  saveFields.forEach(field => {
    if (field) {
      field.addEventListener('change', saveFormState);
      field.addEventListener('input', debounceSave);
    }
  });
  
  els.useTimer.addEventListener('change', saveFormState);
}

let saveTimer = null;
function debounceSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(saveFormState, 500);
}

// ========== 初始化 ==========
async function init() {
  log('MyGO Reloaded 已加载');
  
  // 恢复表单状态
  await restoreFormState();
  
  // 设置自动保存
  setupAutoSave();
  
  // 检查后台运行状态
  const state = await sendMessage('getState');
  if (state?.isRunning) {
    isRunning = true;
    updateStatus('running', '抢票中...');
    log('检测到后台任务正在运行', 'warn');
  }
  
  updateButtons();
}

init();
