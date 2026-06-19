def load_js(tab, js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        js_code = f.read()
    tab.run_js(js_code)
    print(f"✅ JS 已加载: {js_path}")


def ms_sleep(ms):
    time.sleep(ms / 1000)
