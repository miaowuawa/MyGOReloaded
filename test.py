from DrissionPage import ChromiumPage, ChromiumOptions,Chromium
import os
import time
import json

# ========== 路径配置 ==========
PREP_JS_PATH = os.path.join(os.path.dirname(__file__), 'js', 'ticket_prep.js')
PURC_JS_PATH = os.path.join(os.path.dirname(__file__), 'js', 'ticket_purc.js')

# ========== 目标配置 ==========
PROJECT_ID = '1002171'

# ========== iPhone 模拟参数 ==========
IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
IPHONE_WIDTH = 390
IPHONE_HEIGHT = 844
IPHONE_DPR = 3

# ========== 购票配置 ==========
SCREEN_ID = 1008942
TICKET_ID =888199
QTY = 1


# ========== 购买人配置 ==========
BUYER_IDS = ['']
BUYER_INFO = [
]
CONTACT_INFO = {
    'name': '张三',
    'phone': '13800138000'
}


# 重试延迟配置（毫秒）
PREP_RETRY_DELAY_MS = 300
PURC_RETRY_DELAY_MS = 300

# 停止码
PREP_STOP_CODES = {100048, 100079}  # 抢票成功
PREP_END_CODES = {100005, 100004, 212, 216}  # 活动结束
PREP_RETRY_CODES = {100051, 100034,900001}  # 需要重试
PREP_REFRESH_CODES = {100009}  # 库存不足，刷新
PREP_RESTART_CODES = {100049, 100050}  # 需要退回详情页，从prep重新开始

PURC_STOP_CODES = {100048, 100079}  # 抢票成功（支付页）
PURC_END_CODES = {100005, 100004, 212, 216}  # 活动结束


def load_js(tab, js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        js_code = f.read()
    tab.run_js(js_code)
    print(f"✅ JS 已加载: {js_path}")


def ms_sleep(ms):
    time.sleep(ms / 1000)


def parse_prep_response(response_body):
    """解析 prep 响应体"""
    if isinstance(response_body, dict):
        return response_body
    if isinstance(response_body, bytes):
        response_body = response_body.decode('utf-8')
    if isinstance(response_body, str):
        try:
            return json.loads(response_body)
        except Exception:
            return None
    return None


def parse_purc_response(response_body):
    """解析 prep 响应体"""
    if isinstance(response_body, dict):
        return response_body
    if isinstance(response_body, bytes):
        response_body = response_body.decode('utf-8')
    if isinstance(response_body, str):
        try:
            return json.loads(response_body)
        except Exception:
            return None
    return None


def check_is_paying(tab):
    try:
        return 'pay.bilibili.com' in tab.url
    except Exception:
        return False


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
    if errno in PREP_STOP_CODES:
        print(f"🎉 [prep] 抢票成功! errno={errno}")
        return 'stop', f'抢票成功 (errno={errno})'

    # 结束码 - 活动结束
    if errno in PREP_END_CODES:
        print(f"❌ [prep] 活动结束 errno={errno}")
        return 'end', f'活动结束 (errno={errno})'

    # 需要刷新库存
    if errno in PREP_REFRESH_CODES:
        print(f"🔄 [prep] 库存不足 errno={errno}，刷新库存...")
        return 'refresh', None

    # 需要退回详情页重新开始的码
    if errno in PREP_RESTART_CODES:
        print(f"🔄 [prep] 需要重新开始 errno={errno}，退回详情页...")
        return 'restart', None

    # 需要重试的码
    if errno in PREP_RETRY_CODES:
        print(f"🔄 [prep] 需要重试 errno={errno}")
        return 'retry', None

    # 其他未知错误，继续重试
    msg = res_data.get('msg', '未知错误')
    print(f"⚠️ [prep] 未知错误 errno={errno}, msg={msg}，继续重试")
    return 'retry', None


def run_purc(tab):
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
                    res_data = parse_purc_response(body)
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
    if errno in PURC_STOP_CODES:
        return 'stop', f'抢票成功 (errno={errno})'

    # 结束码
    if errno in PURC_END_CODES:
        return 'end', f'活动结束 (errno={errno})'

    # 其他重试
    msg = res_data.get('msg', '未知错误')
    print(f"🔄 [purc] 需要重试 errno={errno}, msg={msg}")
    return 'retry', None


def refresh_stock(tab, project_id):
    """刷新库存"""
    print(f"🔄 刷新库存 project_id={project_id}")
    try:
        res = tab.run_js(f'return await refreshStock({project_id});')
        print(f"📨 库存刷新结果: {res.get('errno', 'N/A')}")
        return res
    except Exception as e:
        print(f"⚠️ 刷新库存失败: {e}")
        return None


def main():
    tab = Chromium().latest_tab

    # ========== 访问详情页并登录 ==========
    tab.get(f'https://show.bilibili.com/platform/detail.html?id={PROJECT_ID}')
    print("=" * 50)
    print("请先在浏览器中登录 B 站账号")
    print("登录完成后，按回车继续")
    print("=" * 50)
    input("[按回车继续...]")

    # ========== 加载 prep JS ==========
    load_js(tab, './js/ticket_prep.js')

    # ========== Prep 阶段：无限重试 ==========
    print("\n" + "=" * 50)
    print("🎫 开始 Prep 阶段")
    print("=" * 50)

    prep_url = None
    while True:
        status, data = run_prep(tab, PROJECT_ID, SCREEN_ID, TICKET_ID, QTY)

        if status == 'success':
            prep_url = data
            break
        elif status == 'stop':
            print(f"🎉 {data}")
            input("\n[按回车退出...]")
            return
        elif status == 'end':
            print(f"❌ {data}")
            input("\n[按回车退出...]")
            return
        elif status == 'refresh':
            refresh_stock(tab, PROJECT_ID)
            ms_sleep(PREP_RETRY_DELAY_MS)
            continue
        else:  # retry
            ms_sleep(PREP_RETRY_DELAY_MS)
            continue

    # ========== 跳转到确认订单页 ==========
    print(f"\n➡️ 跳转确认订单页: {prep_url}")
    tab.get(prep_url)
    time.sleep(1)

    # ========== 加载 purc JS ==========
    load_js(tab, './js/ticket_purc.js')

    # ========== Purc 阶段 ==========
    print("\n" + "=" * 50)
    print("🚀 开始 Purc 阶段")
    print("=" * 50)

    while True:
        status, data = run_purc(tab)

        if status == 'success':
            print(f"\n🎉🎉🎉 抢票成功！订单号: {data}")
            print(f"当前URL: {tab.url}")
            print("请尽快完成支付！")
            break
        elif status == 'stop':
            print(f"\n🎉🎉🎉 抢票成功！{data}")
            print(f"当前URL: {tab.url}")
            print("请尽快完成支付！")
            break
        elif status == 'restart':
            # 退回详情页，重新加载prep JS，从头开始完整流程
            print(f"⬅️ 退回详情页，重新加载...")
            tab.get(f'https://show.bilibili.com/platform/detail.html?id={PROJECT_ID}')
            load_js(tab, './js/ticket_prep.js')
            ms_sleep(PREP_RETRY_DELAY_MS)
            continue
        elif status == 'end':
            print(f"\n❌ {data}")
            break
        else:  # retry
            ms_sleep(PURC_RETRY_DELAY_MS)
            # 重置弹窗状态后继续
            try:
                tab.run_js('''
                    if (window._orderVm) {
                        window._orderVm.isRequestLimit = false;
                        window._orderVm.showErrorPage = false;
                    }
                ''')
            except Exception:
                pass
            continue

    input("\n[按回车退出...]")


if __name__ == '__main__':
    main()