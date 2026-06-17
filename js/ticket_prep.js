// ===== B站票务 - 纯请求工具 (prep) =====
// 职责：在浏览器环境内执行 prep 请求，返回原始响应
// 不处理重试、不弹窗、不跳转，Python 通过监听数据包获取结果

(function() {
    'use strict';

    // ---------- 扫描匿名vm组件 ----------
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

    const vm = scanVm();
    if (!vm) {
        console.error('[prep] vm未找到');
        return;
    }
    window._ticketVm = vm;

    /**
     * 执行 prep 请求
     * @param {Object} opt
     * @returns {Promise<Object>} 原始响应对象
     */
    window.prepRequest = async function(opt = {}) {
        const vm = window._ticketVm;
        if (!vm) throw new Error('vm未找到');

        const {
            projectId,
            screenId,
            ticketId,
            qty = 1,
            orderType = 1,
            token,
            buyerInfo = ''
        } = opt;

        const pid = projectId !== undefined ? projectId : vm.projectInfo?.id;
        const tok = token !== undefined ? token : (vm.verifyToken || '');

        if (!pid) throw new Error('projectId为空');
        if (!screenId) throw new Error('screenId为空');
        if (!ticketId) throw new Error('ticketId为空');

        vm.currentScreenId = screenId;
        vm.currentTicketId = ticketId;
        vm.qty = qty;

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

        // 直接调用 vm 方法，让请求走浏览器正常网络栈（可被 Python 监听）
        const res = await vm.pepareWithRefreshStock(params);
        console.log('[prep] 响应:', res);
        return res;
    };

    /**
     * 刷新库存信息
     * @param {string|number} projectId
     * @returns {Promise<Object>}
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

    console.log('[prep] 已加载，调用: prepRequest({screenId, ticketId, qty})');
})();