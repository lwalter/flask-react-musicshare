from datetime import timedelta
import os
import logging


class Config(object):
    DEBUG = False

    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

    SECRET_KEY = os.environ['SECRET_KEY']

    LOGGING_LEVEL = logging.INFO
    LOGGING_LOCATION = 'app.logs'


class Development(Config):
    DEVELOPMENT = True
    DEBUG = True
    LOGGING_LEVEL = logging.DEBUG


class Production(Config):
    PRODUCTION = True
