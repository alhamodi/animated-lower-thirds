import http.server
import socketserver
import json
import os

PORT = 8080

class ControlPanelHandler(http.server.SimpleHTTPRequestHandler):
    # Class variable to store the latest command
    latest_cmd = {}

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_POST(self):
        path_clean = self.path.split('?')[0]
        if path_clean == '/api/command':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                ControlPanelHandler.latest_cmd = json.loads(post_data.decode('utf-8'))
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(b'{"status":"success"}')
            except Exception as e:
                self.send_response(400)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(b'{"status":"error"}')
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        path_clean = self.path.split('?')[0]
        if path_clean == '/api/command':
            from urllib.parse import urlparse, parse_qs
            try:
                query_components = parse_qs(urlparse(self.path).query)
                if 'cmd' in query_components:
                    cmd_json = query_components['cmd'][0]
                    ControlPanelHandler.latest_cmd = json.loads(cmd_json)
            except Exception:
                pass

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            # Disable caching
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.end_headers()
            self.wfile.write(json.dumps(ControlPanelHandler.latest_cmd).encode('utf-8'))
        elif path_clean == '/api/fonts':
            font_dirs = [
                '/System/Library/Fonts',
                '/System/Library/Fonts/Supplemental',
                '/Library/Fonts',
                os.path.expanduser('~/Library/Fonts')
            ]
            fonts = set()
            for d in font_dirs:
                if os.path.exists(d):
                    for f in os.listdir(d):
                        if f.lower().endswith(('.ttf', '.otf', '.ttc')):
                            name = os.path.splitext(f)[0]
                            name = name.replace('-', ' ')
                            for suffix in [' Bold', ' Italic', ' Regular', ' Medium', ' Light', ' Thin', ' Black']:
                                if name.endswith(suffix):
                                    name = name[:-len(suffix)]
                             # Strip trailing spaces
                            fonts.add(name.strip())
            
            windir = os.environ.get('WINDIR')
            if windir:
                win_fonts = os.path.join(windir, 'Fonts')
                if os.path.exists(win_fonts):
                    for f in os.listdir(win_fonts):
                        if f.lower().endswith(('.ttf', '.otf', '.ttc')):
                            fonts.add(os.path.splitext(f)[0].replace('-', ' ').strip())
            
            font_list = sorted(list(fonts))
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(font_list).encode('utf-8'))
        else:
            super().do_GET()

# Ensure we are in the correct directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), ControlPanelHandler) as httpd:
    print(f"🚀 Server running at http://localhost:{PORT}")
    print("Keep this terminal open while using OBS.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
