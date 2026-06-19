// ===== B站确认订单页 - 纯请求工具 (purc) =====
// 职责：在浏览器环境内执行 createOrder，返回原始响应
// 不处理重试、不弹窗、不跳转，Python 通过监听数据包获取结果

(function() {
    'use strict';

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

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
        // 直接重置所有弹窗标志，让 createOrder 能继续执行
        vm.isRequestLimit = false;
        vm.showErrorPage = false;
        vm.priceChange = false;
        vm.anyTicketStatus = false;
        vm.someNomalTicketStatus = false;
        vm.selectedStatus = false;
        vm.projectOffLineStatus = false;
        vm.ptStatus = false;

        // 隐藏"前方拥挤"弹窗容器
        const limitContainer = document.querySelector('.bili-request-limit-container');
        if (limitContainer) {
            limitContainer.style.cssText = 'visibility:hidden !important;display:none !important;opacity:0 !important;pointer-events:none !important;';
            limitContainer.querySelectorAll('*').forEach(el => {
                el.style.cssText = 'visibility:hidden !important;display:none !important;';
            });
            console.log('[purc] 已隐藏拥挤弹窗');
        }

        console.log('[purc] 已重置弹窗状态');
    }

    // ========== 主入口 ==========
    window.submitOrder = async function(options = {}) {
        const vm = await getVm();
        if (!vm) {
            console.error('[purc] Vue实例未找到');
            return { status: 'no_vm', error: 'Vue实例未找到' };
        }

        console.log('[purc] 页面就绪:', vm.detail?.project_name);

        // 1. 选择购买人
        if (!selectBuyers(vm, options)) {
            return { status: 'no_buyer' };
        }

        // 2. 同意条款
        vm.uncheckedTerms = false;

        // 3. 填联系人
        if (vm.orderObj?.need_contact && options.contact) {
            const bi = vm.$refs.newBuyerInfo;
            if (bi) {
                bi.contactName = options.contact.name || '张三';
                bi.contactTel = options.contact.phone || '13800138000';
                bi.errorCheck = { contactName: false, contactTel: false };
            }
        }

        await sleep(200);

        // 4. 绕过弹窗，直接提交
        bypassPopups(vm);

        const event = makeClickEvent();
        vm.createOrder(0, event);

        // 5. 轮询等待结果（只读状态，不处理弹窗）
        let retries = 60;
        while (retries-- > 0) {
            await sleep(500);

            if (vm.orderId) {
                return { status: 'success', orderId: vm.orderId };
            }

            // 只检测最终失败状态，不处理中间弹窗
            if (!vm.order_create_status) {
                if (vm.showErrorPage && !vm.isRequestLimit) {
                    return { status: 'error', msg: '未知错误' };
                }
            }
        }

        return { status: 'timeout' };
    };

    window.getOrderVm = () => window._orderVm;

    console.log('[purc] 已加载，调用: submitOrder({buyerInfo, contact})');
})();