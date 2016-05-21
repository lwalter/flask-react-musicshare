from app.extensions import db
from app.core.models import CRUDMixin, BaseRecordMixin, CreatedAtMixin


class PlaylistSong(CreatedAtMixin, CRUDMixin, db.Model):
    __tablename__ = 'playlist_song'

    playlist_id = db.Column('playlist_id', db.Integer, db.ForeignKey('playlist.id'), primary_key=True)
    song_id = db.Column('song_id', db.Integer, db.ForeignKey('song.id'), primary_key=True)

    song = db.relationship('Song', lazy='joined')

    def __init__(self, song):
        super().__init__()
        self.song = song


class Playlist(BaseRecordMixin, CRUDMixin, db.Model):
    __tablename__ = 'playlist'

    title = db.Column(db.String, nullable=False)
    songs = db.relationship('PlaylistSong', cascade='all, delete-orphan', backref='playlist')

    def __init__(self, title):
        super().__init__()

        self.title = title

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title
        }
