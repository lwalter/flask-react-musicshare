from app.playlist.models import Playlist, PlaylistSong
from app.song.models import Song
from flask_restful import Resource, reqparse
from flask import current_app


class PlaylistAPI(Resource):
    def post(self):
        req_parse = reqparse.RequestParser(bundle_errors=True)
        req_parse.add_argument('title', type=str, required=True, location='form')

        args = req_parse.parse_args()
        title = args.get('title')

        if title == '':
            return {'message': 'No title provided.'}, 400

        try:
            playlist = Playlist(title)
            playlist.save()
        except Exception as e:
            current_app.logger.error(str(e))
            return {'message': 'Something went wrong.'}, 500

        return {'playlist': playlist.serialize()}, 201


class PlaylistsAPI(Resource):
    def get(self):
        try:
            playlists = Playlist.query.all()
        except Exception as e:
            current_app.logger.error(str(e))
            return {'message': 'Something went wrong.'}, 500

        return {'playlists': [playlist.serialize() for playlist in playlists]}, 200


class PlaylistSongAPI(Resource):
    def get(self, playlist_id):
        try:
            playlist = Playlist.query.get(playlist_id)

            if playlist is None:
                return {'message': 'Playlist does not exist.'}, 404
        except Exception as e:
            current_app.logger.error(str(e))
            return {'message': 'Something went wrong.'}, 500

        return {'songs': [playlist_song.song.serialize() for playlist_song in playlist.playlist_songs]}, 200

    def post(self, playlist_id):
        try:
            playlist = Playlist.query.get(playlist_id)

            if playlist is None:
                return {'message': 'Playlist does not exist.'}, 404

            req_parse = reqparse.RequestParser(bundle_errors=True)
            req_parse.add_argument('title', type=str, required=True, location='form')

            args = req_parse.parse_args()
            title = args.get('title')

            if title == '':
                return {'message': 'No title provided.'}, 400

            song = Song.query.filter_by(title=title).first()
            if song is None:
                song = Song(title)
                song.save()

            playlist_song = PlaylistSong.query.filter_by(playlist_id=playlist.id, song_id=song.id).first()
            if playlist_song is not None:
                return {'message': 'Song already exists.'}, 409

            playlist_song = PlaylistSong(song)
            playlist.playlist_songs.append(playlist_song)
            playlist.save()
        except Exception as e:
            current_app.logger.error(str(e))
            return {'message': 'Something when wrong.'}, 500

        return {'playlist': playlist.serialize()}, 201
