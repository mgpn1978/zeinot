import http.server, functools

PORT = 3000
DIR  = "/Volumes/Mariano/--Mariano/---Smart Smile/Stio Web V2/HMTL"

handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=DIR)
httpd   = http.server.HTTPServer(("", PORT), handler)
print(f"Serving at http://localhost:{PORT}")
httpd.serve_forever()
