from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey



class Wallet(db.Model):
    __tablename__='wallets'
    if environment == 'production':
        __table_args__={'schema': SCHEMA}
    user_id=db.Column(ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    total_fund=db.Column(db.Float)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           onupdate=func.now(), default=func.now())

    users=db.relationship('User', back_populates='wallets')


    def to_dict(self):
        return {
            'id':self.id,
            'owner':self.users.to_dict(),
            'totalFund':self.total_fund,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
