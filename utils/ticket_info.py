"""
票务信息获取模块 - 使用 DrissionPage 截获API请求获取票务详情
"""
import json
import time
from DrissionPage import Chromium


def fetch_ticket_info(project_id, timeout=30):
    """
    访问票务详情页并截获API请求获取票务信息
    
    Args:
        project_id: 项目ID
        timeout: 等待API响应的最大时间（秒）
    
    Returns:
        dict: 票务信息数据
    """
    url = f'https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id={project_id}&noTitleBar=1'
    
    # 获取浏览器标签页
    tab = Chromium().latest_tab
    
    # 启动监听 - 监听所有请求，在回调中处理
    print("📡 启动API监听...")
    tab.listen.start('items_detail/info')
    
    # 访问页面
    print(f"🌐 正在访问页面: {url}")
    tab.get(url)
    tab.wait.doc_loaded()
    
    # 等待API响应
    print("📡 正在等待票务信息API响应...")
    ticket_data = None
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        try:
            # 使用 wait() 等待数据包，设置较短的超时以便及时处理
            packet = tab.listen.wait(timeout=1)
            
            if packet and 'items_detail/info' in packet.url:
                print(f"   捕获到请求: {packet.url}")
                
                # DrissionPage 的 packet 可能需要在 wait 之后才能获取完整的响应
                # 尝试多种方式获取响应
                response = None
                
                # 方式1: 直接访问 packet.response
                if hasattr(packet, 'response') and packet.response:
                    response = packet.response
                    print(f"   方式1获取到响应")
                
                # 方式2: 如果响应还没准备好，等待一下再试
                if not response:
                    time.sleep(0.5)
                    if hasattr(packet, 'response') and packet.response:
                        response = packet.response
                        print(f"   方式2获取到响应(延迟)")
                
                if response:
                    status = getattr(response, 'status', 'unknown')
                    print(f"   响应状态: {status}")
                    
                    # 获取响应体
                    body = None
                    if hasattr(response, 'body'):
                        body = response.body
                    elif hasattr(response, 'text'):
                        body = response.text
                    elif hasattr(response, 'content'):
                        body = response.content
                    
                    print(f"   响应体类型: {type(body)}")
                    
                    if body:
                        try:
                            # 处理不同类型的响应体
                            if isinstance(body, bytes):
                                body_str = body.decode('utf-8')
                            elif isinstance(body, str):
                                body_str = body
                            else:
                                body_str = str(body)
                            
                            print(f"   响应内容长度: {len(body_str)}")
                            
                            # 尝试解析数据 - 可能是JSON字符串或Python字典字符串
                            data = None
                            try:
                                # 方式1: 标准JSON解析
                                data = json.loads(body_str)
                            except json.JSONDecodeError:
                                # 方式2: 可能是Python字典格式（单引号）
                                try:
                                    import ast
                                    data = ast.literal_eval(body_str)
                                    print("   使用ast解析Python字典格式")
                                except:
                                    pass
                            
                            if data:
                                print(f"   API返回: success={data.get('success')}, errno={data.get('errno', 'N/A')}")
                                
                                # 检查不同的数据格式
                                if data.get('success') and data.get('data'):
                                    ticket_data = data['data']
                                    print("✅ 成功获取票务信息")
                                    break
                                elif data.get('errno') == 0 and data.get('data'):
                                    ticket_data = data['data']
                                    print("✅ 成功获取票务信息")
                                    break
                                else:
                                    errno = data.get('errno', 'N/A')
                                    msg = data.get('msg', data.get('message', '未知错误'))
                                    print(f"   API返回错误: errno={errno}, msg={msg}")
                                    # 如果是"商品不存在"错误，继续等待（可能是页面还没加载完）
                                    if '商品不存在' in str(msg):
                                        print("   商品不存在，继续等待...")
                                        continue
                            else:
                                print(f"   无法解析响应数据")
                        except Exception as e:
                            print(f"   解析错误: {e}")
                            print(f"   响应内容前300字符: {str(body)[:300]}")
                    else:
                        print("   响应体为空")
                else:
                    print("   无法获取响应对象")
                    
        except Exception as e:
            # 忽略超时异常，继续等待
            if 'timeout' not in str(e).lower():
                print(f"   监听异常: {e}")
                import traceback
                traceback.print_exc()
    
    tab.listen.stop()
    
    if not ticket_data:
        print("❌ 未能获取票务信息")
        return None
    
    return ticket_data


def parse_ticket_info(data):
    """
    解析票务信息，提取场次、票种、限购等关键信息
    
    Returns:
        dict: 解析后的票务信息
    """
    if not data:
        return None
    
    result = {
        'project_id': data.get('projectId'),
        'project_name': data.get('projectName'),
        'show_date': data.get('showDate'),
        'venue': data.get('skuVenueInfo', {}).get('name'),
        'id_bind': data.get('idBind'),  # 实名认证类型
        'buyer_info': data.get('buyerInfo'),  # 需要的实名信息类型
        'screens': []
    }
    
    # 解析场次信息
    screen_list = data.get('screenList', [])
    for screen in screen_list:
        screen_info = {
            'screen_id': screen.get('id'),
            'screen_name': screen.get('name'),
            'start_time': screen.get('start_time_str'),
            'sale_flag': screen.get('saleFlag', {}).get('display_name'),
            'tickets': []
        }
        
        # 解析票种信息
        ticket_list = screen.get('ticket_list', [])
        for ticket in ticket_list:
            # 获取限购信息
            static_limit = ticket.get('static_limit', {})
            limit_num = static_limit.get('num', 6)  # 默认限购6张
            
            # 处理开售时间 - 可能是时间戳或字符串
            sale_start_raw = ticket.get('sale_start', '')
            sale_start_str = ''
            if sale_start_raw:
                if isinstance(sale_start_raw, int) or (isinstance(sale_start_raw, str) and sale_start_raw.isdigit()):
                    # 时间戳转字符串
                    from datetime import datetime
                    try:
                        sale_start_str = datetime.fromtimestamp(int(sale_start_raw)).strftime('%Y-%m-%d %H:%M:%S')
                    except:
                        sale_start_str = str(sale_start_raw)
                else:
                    sale_start_str = sale_start_raw
            
            ticket_info = {
                'ticket_id': ticket.get('id'),
                'desc': ticket.get('desc'),
                'price': ticket.get('price', 0) / 100,  # 转换为元
                'sale_flag': ticket.get('sale_flag', {}).get('display_name'),
                'clickable': ticket.get('clickable', False),
                'anonymous_buy': ticket.get('anonymous_buy', True),  # 是否匿名购买
                'limit_num': limit_num,
                'sale_start': sale_start_str,
                'sale_end': ticket.get('sale_end')
            }
            screen_info['tickets'].append(ticket_info)
        
        result['screens'].append(screen_info)
    
    return result


def display_ticket_options(ticket_info):
    """
    显示票务选项，供用户选择
    
    Returns:
        dict: 用户选择的配置
    """
    if not ticket_info:
        print("❌ 没有可用的票务信息")
        return None
    
    print("\n" + "=" * 60)
    print(f"🎫 {ticket_info['project_name']}")
    print(f"📅 演出日期: {ticket_info['show_date']}")
    print(f"📍 场馆: {ticket_info['venue']}")
    print("=" * 60)
    
    # 显示实名认证要求
    id_bind = ticket_info.get('id_bind', 0)
    buyer_info = ticket_info.get('buyer_info', '')
    need_realname = id_bind > 0 or '1' in buyer_info or '2' in buyer_info
    
    if need_realname:
        print("⚠️ 本项目需要实名认证")
        if '1' in buyer_info:
            print("   - 需要填写真实姓名")
        if '2' in buyer_info:
            print("   - 需要填写身份证号")
    else:
        print("✅ 本项目不需要实名认证")
    
    print("\n" + "-" * 60)
    
    # 选择场次
    screens = ticket_info['screens']
    if not screens:
        print("❌ 没有可用的场次")
        return None
    
    print("📋 可选场次:")
    for idx, screen in enumerate(screens, 1):
        print(f"  [{idx}] {screen['screen_name']} - {screen['sale_flag']}")
    
    while True:
        choice = input("\n请选择场次 (输入数字): ").strip()
        if choice.isdigit() and 1 <= int(choice) <= len(screens):
            selected_screen = screens[int(choice) - 1]
            break
        print("⚠️ 无效的选择，请重新输入")
    
    print(f"\n✅ 已选择场次: {selected_screen['screen_name']}")
    print("-" * 60)
    
    # 选择票种
    tickets = selected_screen['tickets']
    if not tickets:
        print("❌ 没有可用的票种")
        return None
    
    print("🎟️ 可选票种:")
    all_tickets = []
    for idx, ticket in enumerate(tickets, 1):
        # 判断是否已开售
        sale_start = ticket.get('sale_start', '')
        is_on_sale = ticket['clickable']
        
        if is_on_sale:
            status = "✅可购"
        elif sale_start:
            status = f"⏰未开售 (开售时间: {sale_start})"
        else:
            status = f"❌{ticket['sale_flag']}"
        
        # 实名判断：anonymous_buy=false 表示需要实名
        anonymous_buy = ticket.get('anonymous_buy', True)
        realname = "(需实名)" if anonymous_buy == False else ""
        print(f"  [{idx}] {ticket['desc']} - ¥{ticket['price']:.0f} {status} 限购{ticket['limit_num']}张 {realname}")
        all_tickets.append((idx, ticket))
    
    while True:
        choice = input("\n请选择票种 (输入数字): ").strip()
        if choice.isdigit():
            choice_num = int(choice)
            for idx, ticket in all_tickets:
                if idx == choice_num:
                    selected_ticket = ticket
                    break
            else:
                print("⚠️ 无效的选择，请重新输入")
                continue
            break
        print("⚠️ 无效的选择，请重新输入")
    
    print(f"\n✅ 已选择票种: {selected_ticket['desc']} - ¥{selected_ticket['price']:.0f}")
    print("-" * 60)
    
    # 选择张数
    limit = selected_ticket['limit_num']
    print(f"📝 请选择购买张数 (1-{limit}): ")
    while True:
        qty = input(f"购买张数 (默认1, 最大{limit}): ").strip()
        if not qty:
            qty = 1
            break
        if qty.isdigit() and 1 <= int(qty) <= limit:
            qty = int(qty)
            break
        print(f"⚠️ 请输入1-{limit}之间的数字")
    
    print(f"✅ 购买张数: {qty}张")
    
    # 检查是否未开售，如果是，提示用户
    sale_start = selected_ticket.get('sale_start', '')
    is_on_sale = selected_ticket['clickable']
    auto_timer = False
    
    if not is_on_sale and sale_start:
        print(f"\n⏰ 该票种尚未开售")
        print(f"   开售时间: {sale_start}")
        use_auto = input("\n是否自动配置定时抢购？(y/n，默认y): ").strip().lower()
        if use_auto == '' or use_auto == 'y':
            auto_timer = True
            print("✅ 已配置自动定时抢购")
    
    print("=" * 60)
    
    print("=" * 60)
    
    # 判断是否需要实名认证 - 综合考虑项目和票种
    # 1. 项目级别的实名要求
    id_bind = ticket_info.get('id_bind', 0)
    buyer_info = ticket_info.get('buyer_info', '')
    project_need_realname = id_bind > 0 or '1' in buyer_info or '2' in buyer_info
    
    # 2. 票种级别的实名要求 - anonymous_buy=false 表示需要实名
    anonymous_buy = selected_ticket.get('anonymous_buy', True)
    ticket_need_realname = (anonymous_buy == False)
    
    # 最终判断：项目或票种任一要求实名，则需要实名
    need_realname = project_need_realname or ticket_need_realname
    
    # 返回选择结果
    result = {
        'project_id': ticket_info['project_id'],
        'project_name': ticket_info['project_name'],
        'screen_id': selected_screen['screen_id'],
        'screen_name': selected_screen['screen_name'],
        'ticket_id': selected_ticket['ticket_id'],
        'ticket_desc': selected_ticket['desc'],
        'price': selected_ticket['price'],
        'qty': qty,
        'need_realname': need_realname,
        'realname_type': buyer_info if need_realname else '',
        'sale_start': sale_start,
        'is_on_sale': is_on_sale,
        'auto_timer': auto_timer
    }
    
    return result


def get_ticket_config(project_id):
    """
    主函数：获取票务配置
    
    Args:
        project_id: 项目ID
    
    Returns:
        dict: 用户选择的票务配置
    """
    # 获取原始数据
    raw_data = fetch_ticket_info(project_id)
    if not raw_data:
        return None
    
    # 解析数据
    ticket_info = parse_ticket_info(raw_data)
    if not ticket_info:
        return None
    
    # 显示选项并获取用户选择
    config = display_ticket_options(ticket_info)
    
    return config


if __name__ == '__main__':
    # 测试
    project_id = input("请输入项目ID (如1002171): ").strip()
    if project_id:
        config = get_ticket_config(project_id)
        if config:
            print("\n📋 最终配置:")
            print(json.dumps(config, ensure_ascii=False, indent=2))
