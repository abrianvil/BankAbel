from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Joint_account, db
from ..forms import New_joint_account

joint_account_routes=Blueprint('joint_accounts', __name__)


# SECTION - GET ALL JOINT ACCOUNTS OF THE USER
# TODO - CREATE ERROR HANDLING
@joint_account_routes.route('/')
@login_required
def get_joint_account():
    accounts=Joint_account.query.all()
    my_accounts=[]
    for account in accounts:
        if account.first_owner_id == current_user.id or account.second_owner_id == current_user.id:
            my_accounts.append(account.to_dict())
    return {'jointAccounts': my_accounts},200


# SECTION - GET A SINGLE JOINT ACCOUNT
# TODO - CREATE ERROR HANDLING
@joint_account_routes.route('/<int:id>')
@login_required
def get_one_joint_account(id):
    single= Joint_account.query.get(id)
    if single:
        return single.to_dict(), 200
    else:
        return {
            'errors': 'Joint Account not found',
            'code': 404
        }, 404


# SECTION - CREATE A JOINT ACCOUNT
# TODO - CREATE ERROR HANDLING
@joint_account_routes.route('/', methods=['POST'])
@login_required
def create_joint_account():
    form= New_joint_account()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        joint_account=Joint_account()
        form.populate_obj(joint_account)
        joint_account.first_owner_id = current_user.id

        db.session.add(joint_account)
        db.session.commit()

        return joint_account.to_dict()


# SECTION - UPDATE A JOINT ACCOUNT
# TODO - CREATE ERROR HANDLING
@joint_account_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_joint_account(id):
    to_update= Joint_account.query.get(id)
    if to_update:
        form= New_joint_account()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(to_update)
            db.session.commit()
            return to_update.to_dict(),201

    else:
        return {
            'errors': 'Account not found',
            'code': 404
        }, 404


#SECTION - DELETE A JOINT ACCOUNT
# TODO - CREATE ERROR HANDLING
@joint_account_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_joint_account(id):
    to_delete=Joint_account.query.get(id)
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
