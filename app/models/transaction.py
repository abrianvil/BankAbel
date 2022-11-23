from db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey



class Transaction(db.Model):
    __tablename__='transactions'
    if environment == 'production':
        __table_args__={'schema': SCHEMA}
    sender_id= db.Column(ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    receiver_id=db.Column(ForeignKey(add_prefix_for_prod('users.id')), promaru_key=True)
    amount=db.Column(db.Float, nullable=False)
    due_date=db.Column(db.Datetime(), nullable=False)
    status=db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           onupdate=func.now(), default=func.now())

    users=db.relationship('User', back_populates='transactions')



    def to_dict(self):
        return {
            'id': self.id,
            'sender':self.users.to_dict(),
            'receiver':self.users.to_dict(),
            'amount':self.amount,
            'dueDate':self.due_date,
            'status':self.status,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
