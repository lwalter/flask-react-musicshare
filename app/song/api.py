from flask_restful import Resource, reqparse
from app.song.models import Song
from flask import current_app
from sqlalchemy.exc import IntegrityError


class SongAPI(Resource):
    def get(self, song_id):
        if song_id is None or not song_id:
            return {'message': 'Invalid request, provide a song id.'}, 400

        try:
            song = Song.query.get(song_id)
        except Exception as e:
            current_app.logger.info(str(e))
            return {'message': 'Something went wrong.'}, 500

        return {'song': song.serialize()}, 200

    def post(self):
        req_parse = reqparse.RequestParser(bundle_errors=True)
        req_parse.add_argument('url', type=str, required=False, location='form')
        req_parse.add_argument('title', type=str, required=False, location='form')

        args = req_parse.parse_args()

        url = args.get('url')
        title = args.get('title')

        if not url and not title:
            return {'message': 'No url or title provided.'}, 400

        try:
            song = Song(title)
            song.save()
        except IntegrityError as e:
            current_app.logger.info(str(e))
            return {'message': 'Song already exists'}, 409
        except Exception as e:
            current_app.logger.error(str(e))
            return {'message': 'Something went wrong.'}, 500

        return {'song': song.serialize()}, 201


class SongsAPI(Resource):
    def get(self):
        try:
            songs = Song.query.all()
        except Exception as e:
            current_app.logger.error(str(e))
            return {'message': 'Something went wrong.'}, 500

        return {'songs', [song.serialize() for song in songs]}
