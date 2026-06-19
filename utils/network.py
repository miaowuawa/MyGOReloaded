def parse_response(response_body):
    """解析响应体"""
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