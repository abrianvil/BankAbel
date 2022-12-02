from flask_wtf import FlaskForm
from wtforms import FloatField
from wtforms.validators import DataRequired


class New_wallet(FlaskForm):
    total_fund=FloatField('totalFund') #, validators=[DataRequired()]
