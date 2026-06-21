// ===== Content Script (ISOLATED world) =====
// 职责：作为background和MAIN world之间的桥梁，处理消息转发
// 同时负责将injected.js注入到MAIN world

console.log('[Content] 已加载');

// ========== 注入injected.js到MAIN world ==========
function injectMainWorldScript() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('injected.js');
  script.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}

// 立即注入
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectMainWorldScript);
} else {
  injectMainWorldScript();
}

// ========== 向MAIN world发送消息并等待响应 ==========
function sendToMain(action, data = {}) {
  return new Promise((resolve) => {
    const requestId = Date.now() + '_' + Math.random();

    function handler(event) {
      if (event.source !== window) return;
      if (event.data?.source !== 'mygo-injected') return;
      if (event.data?.requestId !== requestId) return;

      window.removeEventListener('message', handler);
      resolve(event.data.result);
    }

    window.addEventListener('message', handler);

    window.postMessage({
      source: 'mygo-content',
      requestId,
      action,
      data
    }, '*');

    // 超时处理
    setTimeout(() => {
      window.removeEventListener('message', handler);
      resolve(null);
    }, 15000);
  });
}

// ========== 监听background的消息 ==========
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    const { action, ...data } = request;

    switch (action) {
      case 'checkVmReady':
        const vmReady = await sendToMain('checkVmReady');
        sendResponse({ ready: !!vmReady });
        break;

      case 'checkOrderVmReady':
        const orderVmReady = await sendToMain('checkOrderVmReady');
        sendResponse({ ready: !!orderVmReady });
        break;

      case 'prepRequest':
        const prepResult = await sendToMain('prepRequest', data);
        sendResponse(prepResult);
        break;

      case 'submitOrder':
        const purcResult = await sendToMain('submitOrder', data);
        sendResponse(purcResult);
        break;

      case 'checkOrderStatus':
        const statusResult = await sendToMain('checkOrderStatus');
        sendResponse(statusResult);
        break;

      case 'refreshStock':
        const stockResult = await sendToMain('refreshStock', data);
        sendResponse(stockResult);
        break;

      case 'stopPurc':
        await sendToMain('stopPurc');
        sendResponse({ success: true });
        break;

      case 'resetPopupState':
        await sendToMain('resetPopupState');
        sendResponse({ success: true });
        break;

      default:
        sendResponse({ error: '未知操作' });
    }
  })();

  return true;
});
