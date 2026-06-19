"""
实名认证人信息获取模块 - 使用 DrissionPage 获取已保存的实名认证人列表
"""
import json
import time
from DrissionPage import Chromium


def fetch_buyer_list(project_id, timeout=30):
    """
    获取项目的实名认证人列表
    
    Args:
        project_id: 项目ID
        timeout: 等待API响应的最大时间（秒）
    
    Returns:
        list: 实名认证人列表
    """
    url = f'https://show.bilibili.com/api/ticket/buyer/list?is_default&projectId={project_id}'
    
    # 获取浏览器标签页
    tab = Chromium().latest_tab
    
    # 启动监听
    print("📡 启动实名人列表监听...")
    tab.listen.start('show.bilibili.com/api/ticket/buyer/list')
    
    # 访问API
    print(f"🌐 正在获取实名人列表: {url}")
    tab.get(url)
    tab.wait.doc_loaded()
    
    # 等待API响应
    print("📡 正在等待实名人列表响应...")
    buyer_list = None
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        try:
            packet = tab.listen.wait(timeout=1)
            
            if packet and 'buyer/list' in packet.url:
                print(f"   捕获到请求: {packet.url}")
                
                # 尝试获取响应
                response = None
                if hasattr(packet, 'response') and packet.response:
                    response = packet.response
                
                if not response:
                    time.sleep(0.3)
                    if hasattr(packet, 'response') and packet.response:
                        response = packet.response
                
                if response:
                    # 获取响应体
                    body = None
                    if hasattr(response, 'body'):
                        body = response.body
                    elif hasattr(response, 'text'):
                        body = response.text
                    
                    if body:
                        try:
                            # 处理不同类型的响应体
                            if isinstance(body, bytes):
                                body_str = body.decode('utf-8')
                            elif isinstance(body, str):
                                body_str = body
                            else:
                                body_str = str(body)
                            
                            # 尝试解析JSON
                            try:
                                data = json.loads(body_str)
                            except json.JSONDecodeError:
                                import ast
                                data = ast.literal_eval(body_str)
                            
                            if data.get('errno') == 0 and data.get('data'):
                                buyer_data = data['data']
                                max_limit = buyer_data.get('max_limit', 0)
                                buyer_list = buyer_data.get('list', [])
                                print(f"✅ 成功获取实名人列表，共 {len(buyer_list)} 人，最大限制 {max_limit} 人")
                                break
                            else:
                                print(f"   API返回错误: errno={data.get('errno')}, msg={data.get('msg', '未知错误')}")
                        except Exception as e:
                            print(f"   解析错误: {e}")
                    else:
                        print("   响应体为空")
        except Exception as e:
            if 'timeout' not in str(e).lower():
                print(f"   监听异常: {e}")
    
    tab.listen.stop()
    
    if not buyer_list:
        print("❌ 未能获取实名人列表")
        return []
    
    return buyer_list


def display_buyer_selection(buyer_list, qty):
    """
    显示实名人选择界面
    
    Args:
        buyer_list: 实名人列表
        qty: 需要选择的数量
    
    Returns:
        list: 选择的实名人ID列表
    """
    if not buyer_list:
        print("❌ 没有可用的实名人")
        return []
    
    print("\n" + "=" * 60)
    print(f"📝 请选择 {qty} 位实名人")
    print("=" * 60)
    
    # 显示所有实名人
    for idx, buyer in enumerate(buyer_list, 1):
        name = buyer.get('name', '未知')
        personal_id = buyer.get('personal_id', '')
        # 脱敏显示身份证号
        if len(personal_id) > 8:
            personal_id_display = personal_id[:3] + '*' * (len(personal_id) - 6) + personal_id[-3:]
        else:
            personal_id_display = personal_id
        is_default = "【默认】" if buyer.get('is_default') == 1 else ""
        tel = buyer.get('tel', '')
        if len(tel) > 4:
            tel_display = tel[:3] + '*' * (len(tel) - 7) + tel[-4:]
        else:
            tel_display = tel
        
        print(f"  [{idx}] {name} {is_default}")
        print(f"      身份证: {personal_id_display}")
        print(f"      手机: {tel_display}")
    
    print("-" * 60)
    
    # 选择实名人
    selected_ids = []
    
    # 如果有默认实名人且只需要1个，自动选择
    if qty == 1:
        default_buyer = None
        for buyer in buyer_list:
            if buyer.get('is_default') == 1:
                default_buyer = buyer
                break
        
        if default_buyer:
            use_default = input(f"\n是否使用默认实名人 {default_buyer.get('name')}？(y/n，默认y): ").strip().lower()
            if use_default == '' or use_default == 'y':
                selected_ids = [default_buyer.get('id')]
                print(f"✅ 已选择默认实名人: {default_buyer.get('name')}")
                return selected_ids
    
    # 手动选择
    print(f"\n请输入要选择的实名人编号（1-{len(buyer_list)}），用空格分隔:")
    while len(selected_ids) < qty:
        remaining = qty - len(selected_ids)
        choice = input(f"请选择第 {len(selected_ids) + 1} 位实名人 (还剩{remaining}位): ").strip()
        
        if not choice.isdigit():
            print("⚠️ 请输入数字")
            continue
        
        choice_num = int(choice)
        if choice_num < 1 or choice_num > len(buyer_list):
            print(f"⚠️ 请输入1-{len(buyer_list)}之间的数字")
            continue
        
        buyer = buyer_list[choice_num - 1]
        buyer_id = buyer.get('id')
        
        if buyer_id in selected_ids:
            print("⚠️ 该实名人已选择，请选择其他")
            continue
        
        selected_ids.append(buyer_id)
        print(f"  ✅ 已选择: {buyer.get('name')}")
    
    print("=" * 60)
    return selected_ids


def get_selected_buyers(project_id, qty):
    """
    获取用户选择的实名人
    
    Args:
        project_id: 项目ID
        qty: 需要选择的数量
    
    Returns:
        list: 选择的实名人信息列表
    """
    # 获取实名人列表
    buyer_list = fetch_buyer_list(project_id)
    
    if not buyer_list:
        print("⚠️ 未能获取实名人列表，将使用手动输入")
        return None
    
    # 如果实名人数量少于需要的数量
    if len(buyer_list) < qty:
        print(f"⚠️ 警告: 只有 {len(buyer_list)} 位实名人，但需要 {qty} 位")
        print("   将使用所有可用的实名人")
        return buyer_list
    
    # 选择实名人
    selected_ids = display_buyer_selection(buyer_list, qty)
    
    if not selected_ids:
        return None
    
    # 返回完整的实名人信息
    selected_buyers = []
    for buyer in buyer_list:
        if buyer.get('id') in selected_ids:
            selected_buyers.append({
                'id': buyer.get('id'),
                'name': buyer.get('name'),
                'personal_id': buyer.get('personal_id'),
                'tel': buyer.get('tel'),
                'id_type': buyer.get('id_type', 0)
            })
    
    return selected_buyers


def input_buyer_info_manual(qty):
    """
    手动输入购买人信息
    
    Args:
        qty: 需要输入的数量
    
    Returns:
        list: 购买人信息列表
    """
    print("\n" + "=" * 50)
    print("📝 手动输入购买人信息")
    print("=" * 50)
    
    buyers = []
    for i in range(qty):
        print(f"\n购买人 #{i + 1}")
        name = input("  姓名: ").strip()
        while not name:
            print("  ⚠️ 姓名不能为空")
            name = input("  姓名: ").strip()
        
        id_card = input("  身份证号: ").strip()
        while not id_card:
            print("  ⚠️ 身份证号不能为空")
            id_card = input("  身份证号: ").strip()
        
        phone = input("  手机号（可选，回车跳过）: ").strip()
        
        buyers.append({
            'name': name,
            'idCard': id_card,
            'phone': phone,
            'idType': 0
        })
    
    return buyers


if __name__ == '__main__':
    # 测试
    project_id = input("请输入项目ID: ").strip()
    qty = int(input("需要选择的实名人数量: ").strip() or "1")
    
    buyers = get_selected_buyers(project_id, qty)
    if buyers:
        print("\n📋 选择的实名人:")
        for buyer in buyers:
            print(f"  - {buyer['name']} (ID: {buyer['id']})")
    else:
        print("❌ 未选择实名人")
