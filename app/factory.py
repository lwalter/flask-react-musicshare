import os
from flask import Flask
from logging.handlers import RotatingFileHandler
from app.extensions import db, api


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

    from app.song.api import SongAPI, SongsAPI
    api.add_resource(SongAPI, '/api/song')
    api.add_resource(SongsAPI, '/api/songs')

    from app.playlist.api import PlaylistAPI, PlaylistsAPI, PlaylistSongAPI
    api.add_resource(PlaylistAPI, '/api/playlist')
    api.add_resource(PlaylistsAPI, '/api/playlists')
    api.add_resource(PlaylistSongAPI, '/api/playlist/<int:playlist_id>/song', '/api/playlist/<int:playlist_id>/songs')

    api.init_app(app)
    db.init_app(app)

    return app
