import os
from flask import Flask
from logging.handlers import RotatingFileHandler
from app.extensions import db

def create_app(config=None):
    app = Flask(__name__)

    if config:
        app.config.from_object(config)
    else:
        app.config.from_object(os.environ['APP_SETTINGS'])

    handler = RotatingFileHandler(
        app.config['LOGGING_LOCATION'],
        maxBytes=10000,
        backupCount=1)

    from app.home.views import home
    app.register_blueprint(home)

    db.init_app(app)

    return app
