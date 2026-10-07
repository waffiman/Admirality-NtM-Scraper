import os

def app(environ, start_response):
    status = '200 OK'
    filepath = 'index.html'
    try:
        with open(filepath, 'rb') as f:
            content = f.read()
    except Exception as e:
        content = b'SetSail Navigation PWA - Ready'
    headers = [
        ('Content-Type', 'text/html; charset=utf-8'),
        ('Content-Length', str(len(content)))
    ]
    start_response(status, headers)
    return [content]

handler = app
