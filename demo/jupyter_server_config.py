# do not open JupyterLab in a browser after starting
c.ServerApp.open_browser = False

# disable the token for easier testing in an IFrame
c.ServerApp.token = ""

# Allow embedding JupyterLab in an IFrame from a specific host
c.ServerApp.tornado_settings = {
    "headers": {
        "Content-Security-Policy": "frame-ancestors 'self' http://localhost:8080 http://127.0.0.1:8080"
    }
}
c.ServerApp.allow_origin = "http://localhost:8080"

c.ServerApp.disable_check_xsrf = True
