from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey


class Request(db.Model):
    __tablename__ = 'requests'
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, ForeignKey(
        add_prefix_for_prod('users.id')))
    receiver_id = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    message = db.Column(db.String)
    status=db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           onupdate=func.now(), default=func.now())

    users = db.relationship('User', back_populates='requests')

    def to_dict(self):
        return {
            'id': self.id,
            'sender': self.users.to_dict(),
            'receiver': self.receiver_id,
            'amount': self.amount,
            'message': self.message,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
