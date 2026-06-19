def check_is_paying(tab):
    try:
        return 'pay.bilibili.com' in tab.url
    except Exception:
        return False
