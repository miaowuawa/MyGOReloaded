// ===== Injected Script (MAIN world) =====
// 职责：在页面主世界中运行，与页面Vue实例交互
// 监听来自content script的消息，调用ticket_prep.js/ticket_purc.js暴露的接口

(function() {
  'use strict';

  console.log('[Injected] 已加载');

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // ========== 等待全局函数可用 ==========
  async function waitForGlobalFunc(funcName, timeout = 30000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (typeof window[funcName] === 'function') {
        return true;
      }
      await sleep(100);
    }
    return false;
  }

  // ========== 检查VM就绪（详情页） ==========
  async function checkVmReady() {
    // 等待ticket_prep.js加载完成
    const hasWaitForVm = await waitForGlobalFunc('waitForVm', 5000);
    if (!hasWaitForVm) return false;

    // 检查VM是否已获取
    return !!window._ticketVm && typeof window._ticketVm.pepareWithRefreshStock === 'function';
  }

  // ========== 检查订单页VM就绪 ==========
  async function checkOrderVmReady() {
    // 等待ticket_purc.js加载完成
    const hasGetVm = await waitForGlobalFunc('getOrderVm', 5000);
    if (!hasGetVm) return false;

    const vm = window.getOrderVm();
    return !!vm && vm.detail && !vm.initLoading;
  }

  // ========== 执行prep请求 ==========
  async function doPrepRequest(data) {
    const hasFunc = await waitForGlobalFunc('prepRequest', 5000);
    if (!hasFunc) {
      return { errno: -1, msg: 'prepRequest函数未找到' };
    }

    try {
      const result = await window.prepRequest({
        projectId: data.projectId,
        screenId: data.screenId,
        ticketId: data.ticketId,
        qty: data.qty || 1,
        buyerInfo: data.buyerInfo || ''
      });
      return result;
    } catch (e) {
      return { errno: -1, msg: e.message };
    }
  }

  // ========== 执行下单（启动后台循环，立即返回） ==========
  async function doSubmitOrder(data) {
    const hasFunc = await waitForGlobalFunc('submitOrder', 5000);
    if (!hasFunc) {
      return { status: 'no_vm', error: 'submitOrder函数未找到' };
    }

    try {
      // 先停止之前的循环
      if (typeof window.stopPurc === 'function') {
        window.stopPurc();
        await sleep(100);
      }

      const result = await window.submitOrder({
        buyerInfo: data.buyerInfo || [],
        contact: data.contact || {},
        clickDelay: data.clickDelay || 250,
        buyerIds: data.buyerIds || []
      });
      return result;
    } catch (e) {
      return { status: 'exception', error: e.message };
    }
  }

  // ========== 检查订单状态 ==========
  function doCheckOrderStatus() {
    if (typeof window.checkOrderStatus === 'function') {
      return window.checkOrderStatus();
    }
    return { status: 'unknown', msg: 'checkOrderStatus未找到' };
  }

  // ========== 刷新库存 ==========
  async function doRefreshStock(data) {
    const hasFunc = await waitForGlobalFunc('refreshStock', 5000);
    if (!hasFunc) return null;

    try {
      return await window.refreshStock(data.projectId);
    } catch (e) {
      return null;
    }
  }

  // ========== 重置弹窗状态 ==========
  async function doResetPopupState() {
    if (window._orderVm) {
      window._orderVm.isRequestLimit = false;
      window._orderVm.showErrorPage = false;
    }
  }

  // ========== 监听来自content script的消息 ==========
  window.addEventListener('message', async (event) => {
    if (event.source !== window) return;
    if (event.data?.source !== 'mygo-content') return;

    const { requestId, action, data } = event.data;
    let result = null;

    switch (action) {
      case 'checkVmReady':
        result = await checkVmReady();
        break;

      case 'checkOrderVmReady':
        result = await checkOrderVmReady();
        break;

      case 'prepRequest':
        result = await doPrepRequest(data);
        break;

      case 'submitOrder':
        result = await doSubmitOrder(data);
        break;

      case 'checkOrderStatus':
        result = doCheckOrderStatus();
        break;

      case 'refreshStock':
        result = await doRefreshStock(data);
        break;

      case 'stopPurc':
        if (typeof window.stopPurc === 'function') {
          window.stopPurc();
        }
        result = { success: true };
        break;

      case 'resetPopupState':
        await doResetPopupState();
        result = { success: true };
        break;
    }

    window.postMessage({
      source: 'mygo-injected',
      requestId,
      result
    }, '*');
  });

  console.log('[Injected] 消息监听已注册');
})();
