// ===== B站确认订单页 - 纯请求工具 (purc) =====
// 职责：在浏览器环境内执行 createOrder，返回原始响应
// 不处理重试、不弹窗、不跳转，由 background 通过消息通信获取结果

(function() {
    'use strict';

    // 幂等守卫
    if (window.__purcLoaded__) {
        console.log('[purc] 已加载过，跳过重复初始化');
        return;
    }
    window.__purcLoaded__ = true;

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    // ========== 全局计数器 ==========
    let attemptCount = 0;
    let purcLoopRunning = false;

    // ========== 顶部状态栏 ==========
    (function injectStatusBar() {
        const existing = document.getElementById('__purcStatusBar__');
        if (existing) return;

        const bar = document.createElement('div');
        bar.id = '__purcStatusBar__';
        bar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 36px;
            background: linear-gradient(90deg, #ff6b6b, #ee5a6f);
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2147483647;
            letter-spacing: 0.5px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            user-select: none;
            pointer-events: none;
        `;
        bar.innerHTML = `
            <span style="margin-right: 8px;">🎫</span>
            <span id="__purcStatusText__">已尝试下单 0 次，请勿关闭/刷新页面</span>
        `;
        document.documentElement.appendChild(bar);
        const originalPaddingTop = getComputedStyle(document.body).paddingTop;
        document.body.style.paddingTop = (parseFloat(originalPaddingTop || 0) + 36) + 'px';
    })();

    function updateStatus() {
        const textEl = document.getElementById('__purcStatusText__');
        if (textEl) {
            textEl.textContent = `已尝试下单 ${attemptCount} 次，请勿关闭/刷新页面`;
        }
    }

    // ========== 扫描Vue实例 ==========
    function findVueInstance() {
        const all = document.querySelectorAll('*');
        for (const el of all) {
            if (el.__vue__) {
                let vm = el.__vue__;
                while (vm) {
                    if (vm.createOrder && vm.detail?.project_name) {
                        return vm;
                    }
                    vm = vm.$parent;
                }
            }
        }
        return null;
    }

    async function getVm(maxRetries = 100) {
        let attempts = 0;
        while (attempts < maxRetries) {
            const vm = findVueInstance();
            if (vm && vm.detail && !vm.initLoading) {
                window._orderVm = vm;
                console.log('[purc] VM 已获取');
                return vm;
            }
            attempts++;
            if (attempts % 20 === 0) {
                console.log(`[purc] VM获取中... (${attempts}/${maxRetries})`);
            }
            await sleep(100);
        }
        console.error('[purc] VM 获取失败，已达最大重试次数');
        return null;
    }

    // ========== 伪造点击事件 ==========
    function makeClickEvent() {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const x = Math.round(screenW * (0.75 + Math.random() * 0.2));
        const y = Math.round(screenH * (0.8 + Math.random() * 0.15));
        const targetEl = document.elementFromPoint(x, y) || document.body;

        const event = Object.create(null);
        event.type = 'click';
        event.bubbles = true;
        event.cancelable = true;
        event.target = targetEl;
        event.currentTarget = targetEl;
        event.srcElement = targetEl;
        event.clientX = x;
        event.clientY = y;
        event.screenX = x;
        event.screenY = y;
        event.pageX = x + window.scrollX;
        event.pageY = y + window.scrollY;
        event.offsetX = x % 100;
        event.offsetY = y % 100;
        event.button = 0;
        event.buttons = 1;
        event.detail = 1;
        event.ctrlKey = false;
        event.altKey = false;
        event.shiftKey = false;
        event.metaKey = false;
        event.isTrusted = true;
        event.timeStamp = Date.now();
        event.defaultPrevented = false;
        event.eventPhase = 2;
        event.preventDefault = function() { this.defaultPrevented = true; };
        event.stopPropagation = function() {};
        event.stopImmediatePropagation = function() {};
        event.composedPath = function() { return []; };
        return event;
    }

    // ========== 处理购买人信息 ==========
    function addBuyerToList(vm, buyerInfo) {
        const tempId = -(Date.now() % 100000000);
        const newBuyer = {
            id: tempId,
            name: buyerInfo.name,
            tel: buyerInfo.phone || '',
            personal_id: buyerInfo.idCard || '',
            id_type: buyerInfo.idType || 0,
            isBuyerInfoCompleted: true,
            isBuyerInfoVerified: true,
            isBuyerValid: true,
            is_default: 0,
            disabledErr: ''
        };
        if (!vm.userinfodata) vm.userinfodata = {};
        if (!vm.userinfodata.list) vm.userinfodata.list = [];
        vm.userinfodata.list.push(newBuyer);
        return tempId;
    }

    function selectBuyers(vm, options) {
        const count = vm.canSelectBuyerCount;
        if (count === 0) return true;

        let selectedIds = [];

        if (options.buyerIds && options.buyerIds.length > 0) {
            const list = vm.userinfodata?.list || [];
            selectedIds = options.buyerIds.filter(id => {
                const b = list.find(x => x.id === id);
                return b?.isBuyerInfoCompleted && b?.isBuyerValid;
            });
        }

        if (options.buyerInfo && options.buyerInfo.length > 0) {
            for (const info of options.buyerInfo) {
                const exist = vm.userinfodata?.list?.find(b =>
                    b.personal_id === info.idCard && b.personal_id
                );
                if (exist) {
                    if (!selectedIds.includes(exist.id)) selectedIds.push(exist.id);
                } else {
                    const newId = addBuyerToList(vm, info);
                    selectedIds.push(newId);
                }
            }
        }

        const list = vm.userinfodata?.list || [];
        const available = list.filter(b =>
            b.isBuyerInfoCompleted && b.isBuyerValid && !selectedIds.includes(b.id)
        );
        while (selectedIds.length < count && available.length > 0) {
            selectedIds.push(available.shift().id);
        }

        if (selectedIds.length < count) {
            console.error(`[purc] 购买人不足: 需要${count}, 只有${selectedIds.length}`);
            return false;
        }

        vm.selectBuyers = selectedIds.slice(0, count);
        console.log('[purc] 已选购买人:', vm.selectBuyers);
        return true;
    }

    // ========== 设置订单状态（绕过弹窗） ==========
    function bypassPopups(vm) {
        vm.isRequestLimit = false;
        vm.showErrorPage = false;
        vm.priceChange = false;
        vm.anyTicketStatus = false;
        vm.someNomalTicketStatus = false;
        vm.selectedStatus = false;
        vm.projectOffLineStatus = false;
        vm.ptStatus = false;
        if (vm.order_create_status !== undefined) vm.order_create_status = false;
        if (vm.createOrderLoading !== undefined) vm.createOrderLoading = false;
        if (vm.isCreating !== undefined) vm.isCreating = false;
        if (vm.submitting !== undefined) vm.submitting = false;

        const limitContainer = document.querySelector('.bili-request-limit-container');
        if (limitContainer) {
            limitContainer.style.cssText = 'visibility:hidden !important;display:none !important;opacity:0 !important;pointer-events:none !important;';
            limitContainer.querySelectorAll('*').forEach(el => {
                el.style.cssText = 'visibility:hidden !important;display:none !important;';
            });
        }

        console.log('[purc] 已重置弹窗 + 提交状态');
    }

    // ========== 错误码处理 ==========
    const PURC_STOP_CODES = new Set([100048, 100079]);
    const PURC_END_CODES = new Set([100005, 100004, 212, 100039, 100016]);

    function handleCreateOrderResponse(response) {
        if (!response || typeof response !== 'object') return;

        const errno = response.errno;
        if (errno === undefined) return;

        console.log('[purc] createOrder响应 errno:', errno);

        if (PURC_STOP_CODES.has(errno)) {
            console.log('[purc] 抢票成功！停止循环');
            window._purcStop = true;
            window._purcFinalStatus = { status: 'stop', errno: errno, msg: response.msg || '抢票成功' };
            return;
        }

        if (PURC_END_CODES.has(errno)) {
            console.log('[purc] 活动结束，停止循环');
            window._purcStop = true;
            window._purcFinalStatus = { status: 'end', errno: errno, msg: response.msg || '活动结束' };
            return;
        }
    }

    // ========== 后台下单循环（非阻塞） ==========
    async function startPurcLoop(vm, clickDelay) {
        if (purcLoopRunning) {
            console.log('[purc] 下单循环已在运行，先停止旧循环');
            window._purcStop = true;
            purcLoopRunning = false;
            await sleep(200); // 等待旧循环停止
        }
        purcLoopRunning = true;
        window._purcStop = false;
        window._purcAttempt = 0;
        window._purcFinalStatus = null;
        console.log(`[purc] 启动后台下单循环 (clickDelay=${clickDelay}ms)`);

        // 监听页面跳转，自动停止循环
        let lastUrl = window.location.href;
        const urlObserver = setInterval(() => {
            if (window.location.href !== lastUrl) {
                console.log('[purc] 检测到页面跳转，自动停止下单循环');
                lastUrl = window.location.href;
                window._purcStop = true;
                clearInterval(urlObserver);
            }
        }, 500);

        while (!window._purcStop) {
            if (vm.orderId) {
                console.log('[purc] 抢到订单！orderId:', vm.orderId);
                clearInterval(urlObserver);
                purcLoopRunning = false;
                return;
            }
            window.ticketHasStock = true;
            window.ticketUnpaidOrderId = null;
            window.ticketStockStatus = 3;

            bypassPopups(vm);
            const event = makeClickEvent();

            try {
                const r = vm.createOrder(0, event);
                if (r && typeof r.then === 'function') {
                    r.then(res => {
                        handleCreateOrderResponse(res);
                    }).catch(e => {
                        console.warn('[purc] createOrder reject:', e.message);
                    });
                }
            } catch (e) {
                console.warn('[purc] createOrder 异常:', e.message);
            }

            window._purcAttempt++;
            attemptCount++;
            updateStatus();

            if (window._purcAttempt % 10 === 0) {
                console.log(`[purc] 已提交 ${window._purcAttempt} 次`);
            }

            await sleep(clickDelay);
        }

        clearInterval(urlObserver);
        purcLoopRunning = false;
        console.log('[purc] 下单循环已停止');
    }

    // ========== 主入口（立即返回，启动后台循环） ==========
    window.submitOrder = async function(options = {}) {
        const vm = await getVm();
        if (!vm) {
            console.error('[purc] Vue实例未找到');
            return { status: 'no_vm', error: 'Vue实例未找到' };
        }

        console.log('[purc] 页面就绪:', vm.detail?.project_name);

        if (!selectBuyers(vm, options)) {
            return { status: 'no_buyer' };
        }

        vm.uncheckedTerms = false;

        if (vm.orderObj?.need_contact && options.contact) {
            const bi = vm.$refs.newBuyerInfo;
            if (bi) {
                bi.contactName = options.contact.name || '张三';
                bi.contactTel = options.contact.phone || '13800138000';
                bi.errorCheck = { contactName: false, contactTel: false };
            }
        }

        const clickDelay = (options.clickDelay && options.clickDelay > 0) ? options.clickDelay : 250;

        // 启动后台循环（不阻塞）
        startPurcLoop(vm, clickDelay);

        // 立即返回，让调用方知道循环已启动
        return { status: 'started', msg: '下单循环已启动' };
    };

    // ========== 检查订单状态 ==========
    window.checkOrderStatus = function() {
        // 先检查是否有最终状态（活动结束/抢票成功等）
        if (window._purcFinalStatus) {
            return window._purcFinalStatus;
        }

        // 先检查当前是否还在确认订单页
        const currentVm = findVueInstance();
        if (!currentVm) {
            // 页面已跳转，可能token过期返回了信息页
            console.log('[purc] 当前不在确认订单页，可能token过期');
            return { status: 'expired', msg: 'token过期或页面已跳转' };
        }

        const vm = window._orderVm;
        if (vm && vm.orderId) {
            return { status: 'success', orderId: vm.orderId };
        }
        
        // 检查循环状态
        // purcLoopRunning 为 true 表示循环正在运行
        // window._purcStop 为 true 表示循环被要求停止
        if (!purcLoopRunning) {
            // 循环未运行，可能是被停止或尚未启动
            if (window._purcStop) {
                // 被明确停止
                return { status: 'stopped', msg: '循环已停止' };
            } else {
                // 尚未启动或异常停止
                return { status: 'stopped', msg: '循环未启动' };
            }
        }
        
        return { status: 'running', attempt: window._purcAttempt || 0 };
    };

    window.stopPurc = function() {
        window._purcStop = true;
        purcLoopRunning = false;
        console.log('[purc] 收到停止指令');
    };

    window.getOrderVm = function() {
        // 每次获取前重新扫描，避免返回旧页面实例
        const vm = findVueInstance();
        if (vm) {
            window._orderVm = vm;
        }
        return window._orderVm;
    };

    console.log('[purc] 已加载，调用: submitOrder({buyerInfo, contact, clickDelay})');
})();
