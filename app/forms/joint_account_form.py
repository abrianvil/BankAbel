from flask_wtf import FlaskForm
from wtforms import StringField, FloatField,IntegerField
from wtforms.validators import DataRequired


class New_joint_account(FlaskForm):
    name= StringField('name', validators=[DataRequired()])
    second_owner_id=IntegerField('secondOwner', validators=[DataRequired()])
    balance=FloatField('balance')
