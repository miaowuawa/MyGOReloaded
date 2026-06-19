import requests
import time

url = "https://mall.bilibili.com/mall-search-items/items_detail/info"

headers = {
    "content-type": "application/json",
    "origin": "https://mall.bilibili.com",
    "priority": "u=1, i",
    "referer": "https://mall.bilibili.com/neul-next/ticket-renovation/detail.html?id=1001820&noTitleBar=1&from=category_mz",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1"
}

for items_id in range(1001000, 1100001):
    payload = {
        "itemsId": items_id,
        "itemsDetailPageType": 3,
        "from": "category_mz"
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        data = response.json()

        if data.get("data", {}).get("hotProject") is True:
            print(f"找到 hotProject=true, itemsId: {items_id}")
            print(f"JSON数据: {data}")
            break

        print(f"已扫描 itemsId: {items_id}, hotProject: {data.get('data', {}).get('hotProject')}")
        #print(f"JSON数据: {data}")
    except Exception as e:
        print(f"请求失败 itemsId: {items_id}, 错误: {e}")

    time.sleep(0.3)

print("扫描完成")
