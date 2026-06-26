// ===== B站票务 - 纯请求工具 (prep) =====
// 职责：在浏览器环境内执行 prep 请求，返回原始响应
// 后台持续扫描重试按钮，自动点击，消失后自动重新获取 VM

(function() {
    'use strict';

    // 幂等守卫：同一页面重复注入时仅初始化一次，避免后台任务堆积
    if (window.__prepLoaded__) {
        console.log('[prep] 已加载过，跳过重复初始化');
        if (typeof window.reacquireVm === 'function') {
            window.reacquireVm(50).catch(() => {});
        }
        return;
    }
    window.__prepLoaded__ = true;

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

    // 初始获取 - 使用重试机制，等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            acquireVmWithRetry();
        });
    } else {
        acquireVmWithRetry();
    }

    // ========== 后台重试按钮扫描器 ==========
    async function startRetryScanner() {
        if (retryScannerRunning) return;
        retryScannerRunning = true;
        console.log('[prep] 重试按钮扫描器启动');

        // 监听页面跳转，停止扫描器
        let lastUrl = window.location.href;
        const urlObserver = setInterval(() => {
            if (window.location.href !== lastUrl) {
                console.log('[prep] 检测到页面跳转，停止重试按钮扫描器');
                lastUrl = window.location.href;
                retryScannerRunning = false;
                clearInterval(urlObserver);
            }
        }, 500);

        while (retryScannerRunning) {
            const btn = document.querySelector('.bili-button-container.bili-button.bili-button-size-normal.retry-btn');

            if (!btn) {
                await sleep(100);
                continue;
            }

            console.log('[prep] 发现重试按钮，开始自动点击');
            let clickCount = 0;

            while (retryScannerRunning) {
                const currentBtn = document.querySelector('.bili-button-container.bili-button-size-normal.retry-btn');
                if (!currentBtn) {
                    console.log('[prep] 重试按钮已消失，重新获取 VM...');
                    vmReady = false;
                    let reacquireAttempts = 0;
                    while (retryScannerRunning && !vmReady) {
                        const newVm = scanVm();
                        if (newVm) {
                            vm = newVm;
                            window._ticketVm = vm;
                            vmReady = true;
                            console.log('[prep] VM 重新获取成功');
                            break;
                        }
                        reacquireAttempts++;
                        if (reacquireAttempts % 10 === 0) {
                            console.log(`[prep] VM 重新获取中... (${reacquireAttempts}次)`);
                        }
                        await sleep(100);
                    }
                    break;
                }

                currentBtn.click();
                clickCount++;
                if (clickCount % 5 === 0) {
                    console.log(`[prep] 已点击重试按钮 ${clickCount} 次`);
                }
                await sleep(50);
            }
        }

        clearInterval(urlObserver);
        console.log('[prep] 重试按钮扫描器已停止');
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
     * 执行 prep 请求（使用 toPayTicket 触发完整购买流程）
     * 返回值格式: { errno: 0, data: { token, ptoken }, url } 或 { errno: xxx, msg: '...', status: '...' }
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
            buyerInfo = ''
        } = opt;

        const pid = projectId !== undefined ? projectId : currentVm.projectInfo?.id;

        if (!pid) throw new Error('projectId为空');
        if (!screenId) throw new Error('screenId为空');
        if (!ticketId) throw new Error('ticketId为空');

        // 设置 VM 状态（toPayTicket 会读取这些）
        // 注意：currentScreenId 和 currentTicketId 必须是字符串
        currentVm.currentScreenId = String(screenId);
        currentVm.currentTicketId = String(ticketId);
        currentVm.qty = qty;

        // 触发 Vue 的响应式更新，确保 computed 属性重新计算
        // 使用 $nextTick 等待 DOM 更新
        if (currentVm.$nextTick) {
            await new Promise(resolve => currentVm.$nextTick(resolve));
        }
        await sleep(100);

        // 检查 currentTicketObject 是否正确计算
        // 如果为 null，说明 footerInfo 中没有对应的票种数据
        if (!currentVm.currentTicketObject) {
            console.log('[prep] currentTicketObject 为 null，尝试从 projectInfo 获取...');
            
            // 尝试从 projectInfo.screen_list 查找
            const projectScreenList = currentVm.projectInfo?.screen_list || [];
            const projectScreen = projectScreenList.find(s => String(s.id) === String(screenId));
            const projectTicket = projectScreen?.ticket_list?.find(t => String(t.id) === String(ticketId));
            
            if (projectTicket) {
                // 检查 sale_flag
                const saleFlag = projectTicket.sale_flag?.number || projectTicket.sale_flag_number;
                if (saleFlag === 1) {
                    return { errno: 100009, msg: '尚未开售，暂时无法购买', status: 'not_for_sale' };
                }
                if (saleFlag === 2) {
                    return { errno: 100009, msg: '票种已售罄', status: 'sold_out' };
                }
                if (saleFlag === 3) {
                    return { errno: 100009, msg: '票种暂时售罄', status: 'sold_out_temp' };
                }
            }
            
            console.error('[prep] 无法找到对应的票种信息，footerInfo 和 projectInfo 中均无匹配');
            return { errno: -1, msg: '商品还没选好不能去买', status: 'no_ticket' };
        }

        // 记录调用前的 URL
        const beforeUrl = window.location.href;
        let navigated = false;

        // 监听页面跳转（toPayTicket 成功时会跳转页面）
        const checkNavigation = () => {
            if (window.location.href !== beforeUrl) {
                navigated = true;
                return true;
            }
            return false;
        };

        // 劫持 openWindow 来捕获跳转 URL。
        // 注意：window.m() 可能每次返回新的桥接对象（工厂），直接 patch 某次 m()
        // 返回值的 openWindow 属性，对 toPayTicket 内部 m().openWindow 调用无效，
        // 真实 openWindow 仍会触发 location.href 跳转，导致 prepRequest 的 Promise
        // 断裂、background 卡死在 prep 循环。因此必须 patch window.m 本身。
        let capturedUrl = null;
        const originalM = window.m;
        if (typeof originalM === 'function') {
            try {
                window.m = function() {
                    const obj = originalM.apply(this, arguments);
                    if (obj && !obj.__mygoOpenWindowPatched) {
                        const origOpen = obj.openWindow;
                        if (typeof origOpen === 'function') {
                            obj.openWindow = function(...args) {
                                if (args[0] && args[0].url) {
                                    capturedUrl = args[0].url;
                                    console.log('[prep] 捕获到 openWindow URL:', capturedUrl);
                                }
                                // 不调用原始 openWindow：在 PC 浏览器它等价于 location.href，
                                // 放行会导致当前页面整体跳转卸载，prepRequest 的 Promise 会断裂。
                                // 跳转交由 background.js 通过 chrome.tabs.update 控制。
                            };
                        }
                        obj.__mygoOpenWindowPatched = true;
                    }
                    return obj;
                };
            } catch (e) {
                console.warn('[prep] 包裹 window.m 失败:', e.message);
            }
        } else {
            console.warn('[prep] window.m 不可用，无法劫持 openWindow');
        }

        console.log('[prep] 调用 toPayTicket...');

        try {
            // 调用 toPayTicket（它会处理所有前置检查和参数构造）
            await currentVm.toPayTicket();
        } catch (e) {
            console.warn('[prep] toPayTicket 异常:', e.message);
        }

        // 等待一小段时间让页面跳转发生
        await sleep(300);

        // 检查是否发生了页面跳转
        if (checkNavigation() || capturedUrl) {
            // 页面已跳转，说明 toPayTicket 成功触发了跳转
            // 从 URL 中提取 token
            const url = capturedUrl || window.location.href;
            const urlObj = new URL(url);
            const token = urlObj.searchParams.get('token');
            const ptoken = urlObj.searchParams.get('ptoken');

            if (token) {
                console.log('[prep] 成功获取 token，页面已跳转');
                return {
                    errno: 0,
                    data: { token, ptoken },
                    url: url
                };
            }
        }

        // 页面未跳转，说明 toPayTicket 在前置检查时就返回了
        // 检查是否有 toast 提示来判断错误类型
        const toastEl = document.querySelector('.bili-toast-content');
        const toastMsg = toastEl ? toastEl.textContent : '';

        console.log('[prep] toPayTicket 未触发跳转，toast:', toastMsg);

        // 根据 toast 内容判断错误类型
        if (toastMsg.includes('未开售') || toastMsg.includes('尚未开售') || toastMsg.includes('暂时无法购买')) {
            return { errno: 100009, msg: toastMsg || '尚未开售，暂时无法购买', status: 'not_for_sale' };
        }
        if (toastMsg.includes('已售罄') || toastMsg.includes('售罊')) {
            return { errno: 100009, msg: toastMsg || '票种已售罄', status: 'sold_out' };
        }
        if (toastMsg.includes('暂时售罄') || toastMsg.includes('暂时售罊')) {
            return { errno: 100009, msg: toastMsg || '票种暂时售罄', status: 'sold_out_temp' };
        }
        if (toastMsg.includes('等级无法购买') || toastMsg.includes('无法购买')) {
            return { errno: 100009, msg: toastMsg || '当前身份等级无法购买', status: 'level_limit' };
        }
        if (toastMsg.includes('还没选好')) {
            return { errno: 100009, msg: toastMsg || '商品还没选好不能去买', status: 'no_ticket' };
        }

        // 未知情况，返回重试
        return { errno: -1, msg: toastMsg || 'toPayTicket 未触发跳转', status: 'retry' };
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
