from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String(40), nullable=False)
    last_name=db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_pic=db.Column(db.String)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    accounts=db.relationship('Account', back_populates='users', cascade='all,delete')
    transactions=db.relationship('Transaction', back_populates='users', cascade='all, delete')
    wallets=db.relationship('Wallet', back_populates='users', cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName':self.first_name,
            'lastName':self.last_name,
            'username': self.username,
            'email': self.email,
            'picture':self.profile_pic
        }
