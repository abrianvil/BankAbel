from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Account

account_routes=Blueprint('accounts',__name__)


#SECTION - GET ALL ACCOUNTS OF THE USER
@account_routes.route('/')
@login_required
def get_accounts():
    accounts= Account.query.filter_by(user_id=current_user.id)

    return {'accounts':[account.to_dict() for account in accounts]}


@account_routes.route('/', methods=['POST'])
@login_required
def create_account():
    pass
