from datetime import datetime
from app.extensions import db


class CreatedAtMixin:
    created_at = db.Column(db.DateTime, nullable=False)

    def __init__(self):
        super().__init__()
        self.created_at = datetime.utcnow()

    def __repr__(self):
        return '<CreatedAtMixin {0}>'.format(self.created_at)


class IdMixin:
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)

    def __init__(self):
        super().__init__()

    def __repr__(self):
        return '<IdMixin {0}>'.format(self.id)


class BaseRecordMixin(IdMixin, CreatedAtMixin):
    def __init__(self):
        super().__init__()

    def __repr__(self):
        return '<BaseRecordMixin {0}>'.format(self.id)


class CRUDMixin:
    def __init__(self):
        super().__init__()

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return self
