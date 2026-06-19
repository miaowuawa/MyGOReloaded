// ===== B站票务 - 纯请求工具 (prep) =====
// 职责：在浏览器环境内执行 prep 请求，返回原始响应
// 后台持续扫描重试按钮，自动点击，消失后自动重新获取 VM

(function() {
    'use strict';

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    // ========== VM 管理 ==========
    let vm = null;
    let vmReady = false;
    let retryScannerRunning = false;

    function scanVm() {
        const app = document.querySelector('#app')?.__vue_app__;
        if (!app) return null;

        let found = null;
        const walk = (inst, d = 0) => {
            if (!inst || d > 25 || found) return;
            const p = inst.proxy;
            if (p && (p.toPayTicket || p.pepareWithRefreshStock)) { found = p; return; }
            const st = inst.subTree; if (!st) return;
            const ch = st.children;
            if (Array.isArray(ch)) for (const c of ch) {
                if (c?.component) walk(c.component, d+1);
                else if (c?.children) walkVNode(c, d+1);
            } else if (typeof ch === 'object') for (const k in ch) {
                if (k === '_') continue;
                const arr = Array.isArray(ch[k]) ? ch[k] : [ch[k]];
                for (const c of arr) if (c?.component) walk(c.component, d+1);
            }
        };
        const walkVNode = (v, d) => {
            if (!v || d > 25 || found) return;
            if (v.component) walk(v.component, d);
            if (Array.isArray(v.children)) for (const c of v.children) walkVNode(c, d+1);
        };
        walk(app._container?._vnode?.component);
        if (!found) for (const el of document.querySelectorAll('button,a,div')) {
            let p = el.__vueParentComponent;
            while (p) { if (p.proxy?.pepareWithRefreshStock) { found = p.proxy; break; } p = p.parent; }
            if (found) break;
        }
        return found;
    }

    async function acquireVmWithRetry(maxRetries = 100) {
        let attempts = 0;
        while (attempts < maxRetries) {
            const newVm = scanVm();
            if (newVm) {
                vm = newVm;
                window._ticketVm = vm;
                vmReady = true;
                console.log('[prep] VM 已获取');
                return true;
            }
            attempts++;
            if (attempts % 10 === 0) {
                console.log(`[prep] VM获取中... (${attempts}/${maxRetries})`);
            }
            await sleep(100);
        }
        console.error('[prep] VM 获取失败，已达最大重试次数');
        return false;
    }

    // 初始获取 - 使用重试机制
    acquireVmWithRetry();

    // ========== 后台重试按钮扫描器 ==========
    async function startRetryScanner() {
        if (retryScannerRunning) return;
        retryScannerRunning = true;
        console.log('[prep] 重试按钮扫描器启动');

        while (retryScannerRunning) {
            const btn = document.querySelector('.bili-button-container.bili-button.bili-button-type-primary.bili-button-size-normal.retry-btn');

            if (!btn) {
                // 没有按钮，正常轮询
                await sleep(100);
                continue;
            }

            // 发现按钮，开始持续点击
            console.log('[prep] 发现重试按钮，开始自动点击');
            let clickCount = 0;

            while (retryScannerRunning) {
                const currentBtn = document.querySelector('.bili-button-container.bili-button.bili-button-type-primary.bili-button-size-normal.retry-btn');
                if (!currentBtn) {
                    console.log('[prep] 重试按钮已消失，重新获取 VM...');
                    vmReady = false;
                    // 持续尝试重新获取 VM，直到成功
                    let reacquireAttempts = 0;
                    while (retryScannerRunning && !vmReady) {
                        if (acquireVm()) {
                            console.log('[prep] VM 重新获取成功');
                            break;
                        }
                        reacquireAttempts++;
                        if (reacquireAttempts % 10 === 0) {
                            console.log(`[prep] VM 重新获取中... (${reacquireAttempts}次)`);
                        }
                        await sleep(100);
                    }
                    break; // 跳出点击循环，回到外层扫描
                }

                currentBtn.click();
                clickCount++;
                if (clickCount % 5 === 0) {
                    console.log(`[prep] 已点击重试按钮 ${clickCount} 次`);
                }
                await sleep(50); // 快速点击间隔
            }
        }
    }

    // 启动后台扫描器
    startRetryScanner();

    // ========== 对外接口 ==========

    /**
     * 等待 VM 就绪（prepRequest 调用前使用）
     */
    window.waitForVm = async function(timeout = 10000) {
        const start = Date.now();
        while (!vmReady && Date.now() - start < timeout) {
            await sleep(50);
        }
        return vmReady;
    };

    /**
     * 重新获取 VM（外部调用）- 带重试
     */
    window.reacquireVm = async function(maxRetries = 50) {
        vmReady = false;
        return await acquireVmWithRetry(maxRetries);
    };

    /**
     * 执行 prep 请求
     */
    window.prepRequest = async function(opt = {}) {
        // 等待 VM 就绪（可能被重试按钮扫描器置为 false）
        if (!vmReady) {
            console.log('[prep] 等待 VM 就绪...');
            const ok = await window.waitForVm(15000);
            if (!ok) throw new Error('VM 未就绪');
        }

        const currentVm = window._ticketVm;
        if (!currentVm) throw new Error('vm未找到');

        const {
            projectId,
            screenId,
            ticketId,
            qty = 1,
            orderType = 1,
            token,
            buyerInfo = ''
        } = opt;

        const pid = projectId !== undefined ? projectId : currentVm.projectInfo?.id;
        const tok = token !== undefined ? token : (currentVm.verifyToken || '');

        if (!pid) throw new Error('projectId为空');
        if (!screenId) throw new Error('screenId为空');
        if (!ticketId) throw new Error('ticketId为空');

        currentVm.currentScreenId = screenId;
        currentVm.currentTicketId = ticketId;
        currentVm.qty = qty;

        const params = {
            project_id: pid,
            screen_id: screenId,
            order_type: orderType,
            count: qty,
            sku_id: ticketId,
            deliver_type: 0,
            buyer_info: buyerInfo,
            token: tok,
            ignoreRequestLimit: true
        };

        const res = await currentVm.pepareWithRefreshStock(params);
        console.log('[prep] 响应:', res);
        return res;
    };

    /**
     * 刷新库存信息
     */
    window.refreshStock = async function(projectId) {
        const url = `https://show.bilibili.com/api/ticket/project/getV2?id=${projectId}&project_id=${projectId}&requestSource=neul-next`;
        const res = await fetch(url, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Referer': window.location.href
            }
        });
        return await res.json();
    };

    console.log('[prep] 已加载，后台扫描器运行中');
})();