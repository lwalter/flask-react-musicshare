from app.core.models import BaseRecordMixin, CRUDMixin
from app.song.utils import SongUtils
from app.extensions import db


class Song(BaseRecordMixin, CRUDMixin, db.Model):
    __tablename__ = 'song'

    title = db.Column(db.String)
    artist = db.Column(db.String)
    spotify_id = db.Column(db.String)
    youtube_url = db.Column(db.String)
    google_music_id = db.Column(db.String)

    def __init__(self, title):
        super().__init__()
        # Resolve track information
        self.title = title

        # Resolve ids
        self.spotify_id = SongUtils.resolve_spotify_id(self.title)

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'artist': self.artist,
            'spotify_id': self.spotify_id,
            'youtube_url': self.youtube_url,
            'google_music_id': self.google_music_id
        }
