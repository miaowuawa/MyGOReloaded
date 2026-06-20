from DrissionPage import ChromiumPage, ChromiumOptions, Chromium
import os
import time
import json
from datetime import datetime, timedelta
from utils.ticket_info import get_ticket_config
from utils.buyer_info import get_selected_buyers, input_buyer_info_manual

# ========== 路径配置 ==========
PREP_JS_PATH = os.path.join(os.path.dirname(__file__), 'js', 'ticket_prep.js')
PURC_JS_PATH = os.path.join(os.path.dirname(__file__), 'js', 'ticket_purc.js')

# ========== iPhone 模拟参数 ==========
IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
IPHONE_WIDTH = 390
IPHONE_HEIGHT = 844
IPHONE_DPR = 3

# ========== 登录页面 ==========
LOGIN_URL = 'https://passport.bilibili.com/h5-app/passport/login?gourl=https%3A%2F%2Fmall.bilibili.com'

# ========== 错误码配置 ==========
PREP_STOP_CODES = {100048, 100079}  # 抢票成功
PREP_END_CODES = {100005, 100004, 212, 216}  # 活动结束
PREP_RETRY_CODES = {100051, 100034, 900001}  # 需要重试
PREP_REFRESH_CODES = {100009}  # 库存不足，刷新
PREP_RESTART_CODES = {100049, 100050}  # 需要退回详情页，从prep重新开始

PURC_STOP_CODES = {100048, 100079}  # 抢票成功（支付页）
PURC_END_CODES = {100005, 100004, 212, 216, 100039, 100016}  # 活动结束 / 项目不可售(100016) 等终态


def load_js(tab, js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        js_code = f.read()
    tab.run_js(js_code)
    print(f"✅ JS 已加载: {js_path}")


def wait_for_page_ready(tab, check_func_name, timeout=10):
    """等待页面准备就绪，检查指定函数是否可用"""
    print(f"⏳ 等待页面准备就绪 ({check_func_name})...")
    start = time.time()
    while time.time() - start < timeout:
        try:
            result = tab.run_js(f'return typeof {check_func_name} !== "undefined";')
            if result:
                print(f"✅ 页面已就绪: {check_func_name} 可用")
                return True
        except:
            pass
        time.sleep(0.5)
    print(f"⚠️ 等待超时: {check_func_name} 未就绪")
    return False


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
    """解析 purc 响应体"""
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


def check_login_status(tab):
    """检测是否登录成功（页面中包含class='tab'的元素）"""
    try:
        result = tab.run_js('''
            return document.querySelector('.tab') !== null;
        ''')
        return result
    except Exception:
        return False


def wait_for_login(tab, check_interval=3):
    """等待用户登录，每3秒检测一次"""
    print("=" * 50)
    print("⏳ 等待用户登录...")
    print(f"   每 {check_interval} 秒检测一次登录状态")
    print("=" * 50)

    while True:
        if check_login_status(tab):
            print("\n🎉 登录成功！")
            return True
        time.sleep(check_interval)


def input_contact_info():
    """输入联系人信息"""
    print("\n" + "=" * 50)
    print("📞 联系人信息设置")
    print("=" * 50)

    name = input("联系人姓名: ").strip()
    while not name:
        print("⚠️ 联系人姓名不能为空")
        name = input("联系人姓名: ").strip()

    phone = input("联系人手机号: ").strip()
    while not phone:
        print("⚠️ 联系人手机号不能为空")
        phone = input("联系人手机号: ").strip()

    return {
        'name': name,
        'phone': phone
    }


def input_timing_config():
    """输入定时配置"""
    print("\n" + "=" * 50)
    print("⏰ 定时配置")
    print("=" * 50)

    use_timer = input("是否使用定时启动？(y/n，默认n): ").strip().lower() == 'y'

    target_time = None
    if use_timer:
        time_str = input("请输入抢票时间 (格式: YYYY-MM-DD HH:MM:SS): ").strip()
        try:
            target_time = datetime.strptime(time_str, "%Y-%m-%d %H:%M:%S")
            print(f"✅ 已设置抢票时间: {target_time}")
        except ValueError:
            print("⚠️ 时间格式错误，将立即启动")
            target_time = None

    advance_seconds = 0.4
    advance_input = input(f"提前多少秒开始prepare (默认0.4秒): ").strip()
    if advance_input:
        try:
            advance_seconds = float(advance_input)
        except ValueError:
            advance_seconds = 0.4

    return {
        'use_timer': use_timer,
        'target_time': target_time,
        'advance_seconds': advance_seconds
    }


def input_delay_config():
    """输入延迟配置"""
    print("\n" + "=" * 50)
    print("⚙️ 延迟配置")
    print("=" * 50)

    prep_retry = input("prepare重试延迟毫秒 (默认200): ").strip()
    prep_retry = int(prep_retry) if prep_retry.isdigit() else 200

    purc_retry = input("下单重试延迟毫秒 (默认250): ").strip()
    purc_retry = int(purc_retry) if purc_retry.isdigit() else 250

    return {
        'prep_retry_ms': prep_retry,
        'purc_retry_ms': purc_retry
    }


def show_menu():
    """显示启动菜单并收集配置"""
    print("\n" + "=" * 60)
    print("🎫 MyGO Reloaded - B站会员购抢票工具")
    print("=" * 60)

    config = {}

    # 选择票务信息获取方式
    print("\n请选择票务信息获取方式:")
    print("  [1] 自动获取（推荐）- 访问页面获取场次、票种、限购信息")
    print("  [2] 手动输入 - 手动输入project_id, screen_id, ticket_id")

    while True:
        choice = input("\n请选择 (1/2): ").strip()
        if choice == '1':
            project_id = input("请输入项目ID (如1002171): ").strip()
            while not project_id:
                print("⚠️ 项目ID不能为空")
                project_id = input("请输入项目ID (如1002171): ").strip()
            
            # 使用ticket_info模块获取票务信息
            ticket_config = get_ticket_config(project_id)
            if not ticket_config:
                print("❌ 获取票务信息失败")
                exit(1)
            break
        elif choice == '2':
            print("\n" + "=" * 50)
            print("🎫 手动输入票务信息")
            print("=" * 50)
            
            project_id = input("项目ID (project_id): ").strip()
            while not project_id:
                print("⚠️ 项目ID不能为空")
                project_id = input("项目ID (project_id): ").strip()

            screen_id = input("场次ID (screen_id): ").strip()
            while not screen_id:
                print("⚠️ 场次ID不能为空")
                screen_id = input("场次ID (screen_id): ").strip()

            ticket_id = input("票种ID (ticket_id): ").strip()
            while not ticket_id:
                print("⚠️ 票种ID不能为空")
                ticket_id = input("票种ID (ticket_id): ").strip()

            qty = input("购买张数 (默认1): ").strip()
            qty = int(qty) if qty.isdigit() else 1

            ticket_config = {
                'project_id': project_id,
                'project_name': '未知项目',
                'screen_id': int(screen_id),
                'screen_name': '未知场次',
                'ticket_id': int(ticket_id),
                'ticket_desc': '未知票种',
                'price': 0,
                'qty': qty,
                'need_realname': True,
                'realname_type': '1,2'
            }
            break
        print("⚠️ 无效的选择，请重新输入")

    config.update(ticket_config)

    # 购买人信息（根据票种是否需要实名）
    if config.get('need_realname', True):
        print("\n" + "=" * 60)
        print("📝 实名人选择")
        print("=" * 60)
        print("  [1] 从B站账号获取（推荐）- 自动获取已保存的实名人")
        print("  [2] 手动输入 - 手动输入实名人信息")
        
        while True:
            buyer_choice = input("\n请选择 (1/2): ").strip()
            if buyer_choice == '1':
                # 从B站获取实名人
                print("📡 正在从B站获取实名人列表...")
                buyers = get_selected_buyers(config['project_id'], config['qty'])
                if buyers:
                    # 只保存实名人ID列表
                    config['buyer_ids'] = [b['id'] for b in buyers]
                    config['buyer_info'] = []  # 使用ID时不需要手动填写信息
                    print(f"✅ 已成功获取并选择 {len(buyers)} 位实名人")
                    break
                else:
                    print("⚠️ 从B站获取实名人失败或没有保存的实名人")
                    retry = input("是否重试？(y/n): ").strip().lower()
                    if retry == 'y':
                        continue
                    print("将使用手动输入...")
                    config['buyer_info'] = input_buyer_info_manual(config['qty'])
                    config['buyer_ids'] = []
                    break
            elif buyer_choice == '2':
                config['buyer_info'] = input_buyer_info_manual(config['qty'])
                config['buyer_ids'] = []
                break
            print("⚠️ 无效的选择，请重新输入")
    else:
        # 非实名项目，只需要姓名
        config['buyer_info'] = input_buyer_info_manual(config['qty'])
        config['buyer_ids'] = []

    # 联系人信息
    config['contact_info'] = input_contact_info()

    # 定时配置
    # 如果选择了未开售的票种并启用自动定时
    if config.get('auto_timer') and config.get('sale_start'):
        print("\n" + "=" * 50)
        print("⏰ 自动定时配置")
        print("=" * 50)
        try:
            # 解析开售时间
            sale_start = config['sale_start']
            target_time = datetime.strptime(sale_start, "%Y-%m-%d %H:%M:%S")
            config['use_timer'] = True
            config['target_time'] = target_time
            # 设置默认提前prepare时间
            config['advance_seconds'] = 0.4
            print(f"✅ 已自动配置抢票时间: {target_time}")
            print(f"   提前prepare: {config['advance_seconds']}秒")
        except ValueError as e:
            print(f"⚠️ 自动配置失败: {e}")
            # 回退到手动配置
            timing = input_timing_config()
            config.update(timing)
    else:
        # 手动配置定时
        timing = input_timing_config()
        config.update(timing)

    # 延迟配置
    delays = input_delay_config()
    config['prep_retry_delay_ms'] = delays['prep_retry_ms']
    config['purc_retry_delay_ms'] = delays['purc_retry_ms']

    # 显示配置摘要
    print("\n" + "=" * 60)
    print("📋 配置摘要")
    print("=" * 60)
    print(f"项目名称: {config.get('project_name', '未知')}")
    print(f"项目ID: {config['project_id']}")
    print(f"场次: {config.get('screen_name', '未知')}")
    print(f"票种: {config.get('ticket_desc', '未知')} - ¥{config.get('price', 0):.0f}")
    print(f"购买张数: {config['qty']}")
    print(f"购买人数: {len(config['buyer_info'])}")
    print(f"联系人: {config['contact_info']['name']} / {config['contact_info']['phone']}")
    if config['use_timer'] and config['target_time']:
        print(f"抢票时间: {config['target_time']}")
        print(f"提前prepare: {config['advance_seconds']}秒")
    else:
        print("抢票时间: 立即启动")
    print(f"prepare延迟: {config['prep_retry_delay_ms']}ms")
    print(f"下单延迟: {config['purc_retry_delay_ms']}ms")
    print("=" * 60)

    confirm = input("\n确认以上配置？(y/n): ").strip().lower()
    if confirm != 'y':
        print("已取消，请重新运行程序")
        exit(0)

    return config


def wait_for_target_time(target_time, advance_seconds):
    """等待到目标时间前advance_seconds秒"""
    prepare_time = target_time - timedelta(seconds=advance_seconds)

    print(f"\n⏰ 等待抢票时间...")
    print(f"   目标时间: {target_time.strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]}")
    print(f"   将在 {prepare_time.strftime('%H:%M:%S.%f')[:-3]} 开始prepare")
    print("=" * 50)

    while datetime.now() < prepare_time:
        remaining = (prepare_time - datetime.now()).total_seconds()
        if remaining > 10:
            print(f"   还剩 {remaining:.1f} 秒...", end='\r')
            time.sleep(1)
        elif remaining > 1:
            print(f"   还剩 {remaining:.1f} 秒...", end='\r')
            time.sleep(0.1)
        else:
            time.sleep(0.01)

    print(f"\n🚀 时间到！开始执行prepare...")


def run_prep(tab, project_id, screen_id, ticket_id, qty, debug_timing=False):
    """
    执行 prep 阶段，监听数据包获取结果
    返回: ('success', url) | ('retry', None) | ('refresh', None) | ('restart', None) | ('stop', msg) | ('end', msg)
    
    Args:
        debug_timing: 是否打印耗时调试信息
    """
    import time
    start_time = time.time()
    
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
    
    # 计算耗时
    elapsed = time.time() - start_time
    if debug_timing:
        print(f"⏱️ [prep] 请求耗时: {elapsed:.3f}秒")

    # 成功获取 token
    if errno == 0:
        token = res_data.get('data', {}).get('token')
        ptoken = res_data.get('data', {}).get('ptoken')
        if token:
            query = f"token={token}&project_id={project_id}"
            if ptoken:
                query += f"&ptoken={ptoken}"
            url = f"https://mall.bilibili.com/neul-next/ticket/confirmOrder.html?{query}&noTitleBar=1"
            print(f"✅ [prep] 成功 (耗时{elapsed:.3f}s)，URL: {url}")
            return 'success', url

    # 停止码 - 抢票成功
    if errno in PREP_STOP_CODES:
        print(f"🎉 [prep] 抢票成功! errno={errno} (耗时{elapsed:.3f}s)")
        return 'stop', f'抢票成功 (errno={errno})'

    # 结束码 - 活动结束
    if errno in PREP_END_CODES:
        print(f"❌ [prep] 活动结束 errno={errno} (耗时{elapsed:.3f}s)")
        return 'end', f'活动结束 (errno={errno})'

    # 需要刷新库存
    if errno in PREP_REFRESH_CODES:
        print(f"🔄 [prep] 库存不足 errno={errno}，刷新库存... (耗时{elapsed:.3f}s)")
        return 'refresh', None

    # 需要退回详情页重新开始的码
    if errno in PREP_RESTART_CODES:
        print(f"🔄 [prep] 需要重新开始 errno={errno}，退回详情页... (耗时{elapsed:.3f}s)")
        return 'restart', None

    # 需要重试的码
    if errno in PREP_RETRY_CODES:
        if debug_timing:
            print(f"🔄 [prep] 需要重试 errno={errno} (耗时{elapsed:.3f}s)")
        return 'retry', None

    # 其他未知错误，继续重试
    msg = res_data.get('msg', '未知错误')
    if debug_timing:
        print(f"⚠️ [prep] 未知错误 errno={errno}, msg={msg} (耗时{elapsed:.3f}s)")
    return 'retry', None


def run_purc(tab, buyer_info, contact_info, buyer_ids=None, click_delay_ms=250, max_wait=60):
    """
    执行 purc 阶段。
    JS 内部负责重试循环与点击延迟，本函数只监听 createOrder 数据包，
    按 errno 判定是否终止（成功/停止/结束）并通知 JS 退出循环。

    返回: ('success', order_id) | ('retry', None) | ('stop', msg) | ('end', msg)
    """
    # 启动监听 createOrder API
    tab.listen.start('show.bilibili.com/api/ticket/order/create')

    # 构建JS调用参数
    js_options = {
        "buyerInfo": buyer_info,
        "contact": contact_info,
        "clickDelay": click_delay_ms
    }

    # 如果有buyer_ids，添加到参数中
    if buyer_ids:
        js_options["buyerIds"] = buyer_ids
        print(f"[purc] 使用实名人ID: {buyer_ids}")

    args_json = json.dumps(js_options, ensure_ascii=False)

    # 启动 JS 重试循环（重试 + 点击延迟均在 JS 内）
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

    # 监听 createOrder 数据包，按状态码决定终止与否
    start = time.time()
    last_errno = None

    while time.time() - start < max_wait:
        # 已进入支付页 = 成功
        if check_is_paying(tab):
            window_stop_sent = _notify_purc_stop(tab)
            tab.listen.stop()
            return 'stop', '已进入支付页'

        # 先看 JS 是否已主动返回（no_vm/no_buyer/异常）
        try:
            direct = tab.run_js('return window._purcResult;')
            if direct:
                status = direct.get('status')
                if status == 'success':
                    tab.listen.stop()
                    return 'success', direct.get('orderId')
                if status == 'no_buyer':
                    tab.listen.stop()
                    return 'end', '购买人信息不足'
                if status == 'no_vm':
                    tab.listen.stop()
                    return 'retry', 'Vue实例未找到'
                if status in ('exception', 'stopped'):
                    # 循环被外部终止或异常，转交监听到的数据包判定
                    pass
        except Exception:
            pass

        # 监听 createOrder 数据包
        try:
            packet = tab.listen.wait(timeout=1)
            if packet and 'create' in packet.url:
                body = packet.response.body if hasattr(packet.response, 'body') else None
                if body:
                    res_data = parse_purc_response(body)
                    errno = res_data.get('errno') if res_data else None
                    last_errno = errno
                    print(f"📨 [purc] 捕获数据包: errno={errno}")

                    # 命中需终止的状态码 → 通知 JS 停止重试
                    if errno == 0:
                        _notify_purc_stop(tab)
                        tab.listen.stop()
                        order_id = res_data.get('data', {}).get('order_id')
                        print(f"🎉 [purc] 订单创建成功! order_id={order_id}")
                        return 'success', order_id
                    if errno in PURC_STOP_CODES:
                        _notify_purc_stop(tab)
                        tab.listen.stop()
                        return 'stop', f'抢票成功 (errno={errno})'
                    if errno in PURC_END_CODES:
                        _notify_purc_stop(tab)
                        tab.listen.stop()
                        return 'end', f'活动结束 (errno={errno})'
                    # 其他 errno: JS 继续重试，本循环继续监听
        except Exception:
            pass

        time.sleep(0.05)

    # 超时未命中终止码：通知 JS 停止，上报最后一次 errno
    _notify_purc_stop(tab)
    tab.listen.stop()
    if last_errno is not None:
        print(f"⚠️ [purc] 监听超时，最后 errno={last_errno}")
    else:
        print("⚠️ [purc] 无响应")
    return 'retry', None


def _notify_purc_stop(tab):
    """通知 JS 终止重试循环。失败不影响后续逻辑。"""
    try:
        tab.run_js('if (typeof window.stopPurc === "function") window.stopPurc();')
        return True
    except Exception:
        return False


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
    # 显示菜单并收集配置
    config = show_menu()

    # 启动浏览器
    tab = Chromium().latest_tab

    # 访问登录页面
    print("\n" + "=" * 50)
    print("🔐 正在打开登录页面...")
    print("=" * 50)
    tab.get(LOGIN_URL)

    # 等待登录
    wait_for_login(tab, check_interval=3)

    # 跳转到详情页（提前打开页面）
    # 注意：必须用 mall 域新版页面，ticket_prep.js 的 VM 扫描针对此页面编写
    print(f"\n➡️ 跳转到抢票页面...")
    tab.get(f'https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id={config["project_id"]}&noTitleBar=1')
    tab.wait.doc_loaded()
    
    # 等待页面完全加载（Vue应用挂载 + 下单组件可被扫描到）
    print("⏳ 等待页面 Vue 应用挂载 + 下单组件就绪...")
    # 先注入 prep JS（IIFE 内部会启动 acquireVmWithRetry 持续扫 VM）
    load_js(tab, './js/ticket_prep.js')

    vm_wait_deadline = time.time() + 60  # 最长等 60s
    while time.time() < vm_wait_deadline:
        try:
            # 同步查 prep JS 是否已把 VM 挂到 window._ticketVm
            ready = tab.run_js('return !!window._ticketVm && (typeof window._ticketVm.pepareWithRefreshStock === "function");')
            if ready:
                print("✅ Vue 实例 + 下单组件已就绪")
                break
        except Exception as e:
            print(f"⚠️ 等待就绪异常: {e}")
        time.sleep(0.5)
    else:
        print("⚠️ 等待 VM 超时（60s），继续尝试 prep...")
    
    # 如果需要定时，等待到目标时间
    if config['use_timer'] and config['target_time']:
        wait_for_target_time(config['target_time'], config['advance_seconds'])

    # ========== Prep 阶段 ==========
    print("\n" + "=" * 50)
    print("🎫 开始 Prep 阶段")
    print("=" * 50)

    prep_url = None
    while True:
        # 启用耗时调试模式
        status, data = run_prep(tab, config['project_id'], config['screen_id'], config['ticket_id'], config['qty'], debug_timing=True)

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
            refresh_stock(tab, config['project_id'])
            ms_sleep(config['prep_retry_delay_ms'])
            continue
        elif status == 'restart':
            print(f"⬅️ 退回详情页，重新加载...")
            tab.get(f'https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id={config["project_id"]}&noTitleBar=1')
            tab.wait.doc_loaded()
            # 重新注入 prep JS 并等待下单组件 VM 就绪
            load_js(tab, './js/ticket_prep.js')
            vm_wait_deadline = time.time() + 60
            while time.time() < vm_wait_deadline:
                try:
                    ready = tab.run_js('return !!window._ticketVm && (typeof window._ticketVm.pepareWithRefreshStock === "function");')
                    if ready:
                        break
                except:
                    pass
                time.sleep(0.5)
            ms_sleep(config['prep_retry_delay_ms'])
            continue
        else:  # retry
            ms_sleep(config['prep_retry_delay_ms'])
            continue

    # ========== 跳转到确认订单页 ==========
    print(f"\n➡️ 跳转确认订单页: {prep_url}")
    tab.get(prep_url)
    
    # 等待页面完全加载（带超时）
    print("⏳ 等待确认订单页加载...")
    max_wait = 15  # 最多等待15秒
    start_wait = time.time()
    loaded = False
    
    while time.time() - start_wait < max_wait:
        # 检查URL是否正确
        if 'confirmOrder' in tab.url:
            # 再等待一下确保页面基本加载
            time.sleep(0.5)
            print("✅ 确认订单页已加载")
            loaded = True
            break
        time.sleep(0.2)
    
    if not loaded:
        print(f"⚠️ 确认订单页加载超时")
        print(f"   当前URL: {tab.url}")
        if 'confirmOrder' not in tab.url:
            print("❌ 未跳转到确认订单页，可能需要重新执行prepare")
            return
        else:
            print("✅ URL正确，继续执行...")
            loaded = True

    # ========== 加载 purc JS ==========
    load_js(tab, './js/ticket_purc.js')

    # ========== Purc 阶段 ==========
    print("\n" + "=" * 50)
    print("🚀 开始 Purc 阶段")
    print("=" * 50)

    while True:
        status, data = run_purc(
            tab,
            config['buyer_info'],
            config['contact_info'],
            config.get('buyer_ids'),
            click_delay_ms=config['purc_retry_delay_ms'],
        )

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
        elif status == 'end':
            print(f"\n❌ {data}")
            break
        else:  # retry
            ms_sleep(config['purc_retry_delay_ms'])
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
