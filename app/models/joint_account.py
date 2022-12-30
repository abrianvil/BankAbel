from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey


class Joint_account(db.Model):
    __tablename__ = "joint_accounts"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    balance = db.Column(db.Float, default=0.00)
    first_owner_id = db.Column(
        db.Integer, ForeignKey(add_prefix_for_prod("users.id")), unique=False
    )
    second_owner_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, server_default=func.now())
    updated_at = db.Column(
        db.DateTime(), nullable=False, onupdate=func.now(), default=func.now()
    )

    owner= db.relationship('User', back_populates='joint_accounts')


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "balance": self.balance,
            "owner": self.owner.to_dict(),
            'secondUser':self.second_owner_id,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
