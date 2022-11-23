from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, DateField
from wtforms.validators import DataRequired
from app.models import Transaction


class New_transaction(FlaskForm):

    amount=FloatField('Amount', validators=[DataRequired()])
    due_date=DateField('Due Date')
    status=StringField('status', default='Pending')
    
