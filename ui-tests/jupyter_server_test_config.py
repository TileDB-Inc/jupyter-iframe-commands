"""Server configuration for integration tests.

!! Never use this configuration in production because it
opens the server to the world and provide access to JupyterLab
JavaScript objects through the global window variable.
"""

from jupyterlab.galata import configure_jupyter_server

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
c.ServerApp.allow_origin = "http://127.0.0.1:8080"

c.ServerApp.disable_check_xsrf = True

# c.LabApp.expose_app_in_browser = True

configure_jupyter_server(c)

# Uncomment to set server log level to debug level
# c.ServerApp.log_level = "DEBUG"
