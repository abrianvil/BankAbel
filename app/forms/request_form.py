from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, DateField, IntegerField
from wtforms.validators import DataRequired


class New_request(FlaskForm):
    sender_id=IntegerField('sender', validators=[DataRequired()])
    message=StringField('message')
    status=StringField('status')
    receiver_id=IntegerField('receiver', validators=[DataRequired()])
    amount=FloatField('amount', validators=[DataRequired()])
