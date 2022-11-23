from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship



class Transaction(db.Model):
    __tablename__='transactions'
    if environment == 'production':
        __table_args__={'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    sender_id= db.Column(db.Integer,ForeignKey(add_prefix_for_prod('users.id')))
    receiver_id=db.Column(db.Integer)

    amount=db.Column(db.Float, nullable=False)
    due_date=db.Column(db.DateTime(), nullable=False)
    status=db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           onupdate=func.now(), default=func.now())

    # sender_id=relationship('User', foreign_keys=[sender_id])
    # receiver_id=relationship('User', foreign_keys=[receiver_id])
    users=db.relationship('User', back_populates='transactions')



    def to_dict(self):
        return {
            'id': self.id,
            'sender':self.sender_id,
            'receiver':self.receiver_id,
            'amount':self.amount,
            'dueDate':self.due_date,
            'status':self.status,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
