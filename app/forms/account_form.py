from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, DateField
from wtforms.validators import DataRequired


class New_account(FlaskForm):
    name= StringField('name', validators=[DataRequired()])
    balance=FloatField('balance')
