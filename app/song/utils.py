import spotipy
from flask import current_app


class SongUtils:
    @staticmethod
    def resolve_spotify_id(title, artist=None):
        if title is None:
            raise TypeError('A song title must be provided')
        elif type(title) is not str:
            raise TypeError('Title must be a string')

        if artist is not None and type(artist) is not str:
            raise TypeError('Artist must be a string')

        try:
            sp = spotipy.Spotify()
            results = sp.search(q=title, limit=10, type='track')
        except Exception as e:
            current_app.logger.info(str(e))
            raise Exception('Could not retrieve Spotify information for this track.')

        tracks = results.get('tracks').get('items')
        track_id = 0
        title = title.lower()

        # Definitely need to flesh out this algorithm
        for track in tracks:
            curr_title = track.get('name').lower()
            if title in track.get('name').lower():
                track_id = track.get('id')
                break

        if not track_id:
            raise Exception('Could not resolve Spotify id.')

        return track_id
