from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Account, db
from ..forms import New_account

account_routes = Blueprint('accounts', __name__)


# SECTION - GET ALL ACCOUNTS OF THE USER
# TODO - CREATE ERROR HANDLING
@account_routes.route('/')
@login_required
def get_accounts():
    accounts = Account.query.filter_by(user_id=current_user.id)

    return {'accounts': [account.to_dict() for account in accounts]}, 200


# SECTION - GET A SINGLE ACCOUNT
# TODO - CREATE ERROR HANDLING
@account_routes.route('/<int:id>')
@login_required
def get_one_account(id):
    one_account = Account.query.get(id)
    if one_account:
        return one_account.to_dict(), 200


# SECTION - CREATE AN ACCOUNT
# TODO - CREATE ERROR HANDLING
@account_routes.route('/', methods=['POST'])
@login_required
def create_account():
    form = New_account()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        account = Account()
        form.populate_obj(account)
        # account.balance=0.00
        account.user_id = current_user.id

        db.session.add(account)
        db.session.commit()

        return account.to_dict()


# SECTION - UPDATE AN ACCOUNT
# TODO - CREATE ERROR HANDLING
@account_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_account(id):
    to_update = Account.query.get(id)
    if to_update:
        form = New_account()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(to_update)
            db.session.commit()
            return to_update.to_dict(), 201

    else:
        return {
            'errors': 'Account not found',
            'code': 404
        }, 404



#SECTION - DELETE AND ACCOUNT
# TODO - CREATE ERROR HANDLING
@account_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_account(id):
    to_delete=Account.query.get(id)
    if to_delete:
        db.session.delete(to_delete)
        db.session.commit()
        return {
            'message': 'Account successfully deleted',
            'Status code': 302
        },302
    else:
        return {
            'errors': 'Account not found',
            'Status code': 404
        },404
