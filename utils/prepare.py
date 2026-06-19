import json
import time
from consts import code

def run_prep(tab, project_id, screen_id, ticket_id, qty):
    """
    执行 prep 阶段，监听数据包获取结果
    返回: ('success', url) | ('retry', None) | ('refresh', None) | ('restart', None) | ('stop', msg) | ('end', msg)
    """
    # 启动监听 prep API
    tab.listen.start('show.bilibili.com/api/ticket/order/prepare')

    # 执行 JS 请求
    tab.run_js(f'''
        window._prepResult = null;
        (async function() {{
            try {{
                const res = await prepRequest({{
                    projectId: {project_id},
                    screenId: {screen_id},
                    ticketId: {ticket_id},
                    qty: {qty}
                }});
                window._prepResult = res;
            }} catch (e) {{
                window._prepResult = {{errno: -1, msg: e.message}};
            }}
        }})();
    ''')

    # 等待数据包
    max_wait = 10  # 最多等10秒
    start = time.time()
    res_data = None

    while time.time() - start < max_wait:
        try:
            packet = tab.listen.wait(timeout=2)
            if packet and 'prepare' in packet.url:
                body = packet.response.body if hasattr(packet.response, 'body') else None
                if body:
                    res_data = parse_prep_response(body)
                    print(f"📨 [prep] 捕获数据包: errno={res_data.get('errno') if res_data else 'N/A'}")
                    break
        except Exception as e:
            # 也可能 JS 直接返回了结果
            pass

        # 检查 JS 直接返回
        try:
            direct = tab.run_js('return window._prepResult;')
            if direct:
                res_data = direct
                print(f"📨 [prep] JS 直接返回: errno={direct.get('errno', 'N/A')}")
                break
        except Exception:
            pass

        time.sleep(0.1)

    tab.listen.stop()

    if not res_data:
        print("⚠️ [prep] 无响应，重试...")
        return 'retry', None

    errno = res_data.get('errno')

    # 成功获取 token
    if errno == 0:
        token = res_data.get('data', {}).get('token')
        ptoken = res_data.get('data', {}).get('ptoken')
        if token:
            query = f"token={token}&project_id={project_id}"
            if ptoken:
                query += f"&ptoken={ptoken}"
            url = f"https://mall.bilibili.com/neul-next/ticket/confirmOrder.html?{query}&noTitleBar=1"
            print(f"✅ [prep] 成功，URL: {url}")
            return 'success', url

    # 停止码 - 抢票成功
    if errno in code.PREP_STOP_CODES:
        print(f"🎉 [prep] 抢票成功! errno={errno}")
        return 'stop', f'抢票成功 (errno={errno})'

    # 结束码 - 活动结束
    if errno in code.PREP_END_CODES:
        print(f"❌ [prep] 活动结束 errno={errno}")
        return 'end', f'活动结束 (errno={errno})'

    # 需要重试的码
    if errno in code.PREP_RETRY_CODES:
        print(f"🔄 [prep] 需要重试 errno={errno}")
        return 'retry', None

    # 其他未知错误，继续重试
    msg = res_data.get('msg', '未知错误')
    print(f"⚠️ [prep] 未知错误 errno={errno}, msg={msg}，继续重试")
    return 'retry', None
