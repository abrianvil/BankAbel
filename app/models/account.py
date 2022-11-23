from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey



class Account(db.Model):
    __tablename__='accounts'
    if environment == 'production':
        __table_args__={'schema': SCHEMA}
    name=db.Column(db.String(32), nullable=False)
    balance=db.Column(db.Float)
    user_id=db.Column(ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           onupdate=func.now(), default=func.now())


    users=db.relationship('User',back_populates='accounts')


    def to_dict(self):
        return {
            'id': self.id,
            'name':self.name,
            'balance':self.balance,
            'owner': self.users.to_dict(),
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
