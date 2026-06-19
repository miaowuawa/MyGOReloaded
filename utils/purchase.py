import json
import time
from utils.browser import check_is_paying
from utils.network import parse_response
from consts import code

def run_purc(tab,BUYER_INFO,CONTACT_INFO):
    """
    执行 purc 阶段，监听 createOrder 数据包
    返回: ('success', order_id) | ('retry', None) | ('stop', msg) | ('end', msg)
    """

    # 启动监听 createOrder API
    tab.listen.start('show.bilibili.com/api/ticket/order/create')

    # 执行 JS 提交
    args_json = json.dumps({
        "buyerInfo": BUYER_INFO,
        "contact": CONTACT_INFO
    }, ensure_ascii=False)

    tab.run_js(f'''
        window._purcResult = null;
        (async function() {{
            try {{
                const res = await submitOrder({args_json});
                window._purcResult = res;
            }} catch (e) {{
                window._purcResult = {{status: 'exception', error: e.message}};
            }}
        }})();
    ''')

    # 等待数据包或 JS 返回
    max_wait = 15
    start = time.time()
    res_data = None

    while time.time() - start < max_wait:
        # 先检查是否到支付页了
        if check_is_paying(tab):
            tab.listen.stop()
            return 'stop', '已进入支付页'

        try:
            packet = tab.listen.wait(timeout=2)
            if packet and 'create' in packet.url:
                body = packet.response.body if hasattr(packet.response, 'body') else None
                if body:
                    res_data = parse_response(body)
                    errno = res_data.get('errno') if res_data else None
                    print(f"📨 [purc] 捕获数据包: errno={errno}")
                    break
        except Exception:
            pass

        # 检查 JS 直接返回
        try:
            direct = tab.run_js('return window._purcResult;')
            if direct and direct.get('status') in ('success', 'error', 'timeout', 'no_buyer'):
                # JS 层已经得到结果
                status = direct.get('status')
                if status == 'success':
                    tab.listen.stop()
                    return 'success', direct.get('orderId')
                elif status == 'timeout':
                    print("⚠️ [purc] JS 超时")
                    break
                elif status == 'no_buyer':
                    tab.listen.stop()
                    return 'end', '购买人信息不足'
                break
        except Exception:
            pass

        time.sleep(0.1)

    tab.listen.stop()

    if not res_data:
        # 没有捕获到数据包，检查是否到支付页
        if check_is_paying(tab):
            return 'stop', '已进入支付页'
        print("⚠️ [purc] 无响应，重试...")
        return 'retry', None

    errno = res_data.get('errno')

    # 成功
    if errno == 0:
        order_id = res_data.get('data', {}).get('order_id')
        print(f"🎉 [purc] 订单创建成功! order_id={order_id}")
        return 'success', order_id

    # 停止码
    if errno in code.PURC_STOP_CODES:
        return 'stop', f'抢票成功 (errno={errno})'

    # 结束码
    if errno in code.PURC_END_CODES:
        return 'end', f'活动结束 (errno={errno})'
    if errno in code.PREP_RESTART_CODES:
        return 'restart', f'prepare已过期 (errno={errno})'

    msg = res_data.get('msg', '未知错误')
    print(f"🔄 [purc] 需要重试 errno={errno}, msg={msg}")
    return 'retry', None