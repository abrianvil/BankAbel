from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Transaction, db
from ..forms.transaction_form import New_transaction
from sqlalchemy.sql import func

transaction_routes = Blueprint('transaction', __name__)


# SECTION - GET ALL USER'S TRANSACTIONS
# TODO - CREATE ERROR HANDLING
@transaction_routes.route('/')
@login_required
def get_transactions():
    transactions = Transaction.query.all()
    res = []
    for transaction in transactions:
        if transaction.sender_id == current_user.id or transaction.receiver_id == current_user.id:
            res.append(transaction.to_dict())
    return {'transactions': res}, 200


# SECTION - GET A SINGLE TRANSACTION
# TODO - CREATE ERROR HANDLING
@transaction_routes.route('/<int:id>')
@login_required
def get_one_transaction(id):
    transaction = Transaction.query.get(id)
    if transaction:
        return transaction.to_dict(), 200
    else:
        return {
            'errors': 'Transaction not found',
            'Status code': 404
        }, 404


# SECTION - CREATE A TRANSACTION
# TODO - CREATE ERROR HANDLING
@transaction_routes.route('/', methods=['POST'])
@login_required
def create_transaction():
    form = New_transaction()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        transaction = Transaction()
        form.populate_obj(transaction)
        transaction.sender_id = current_user.id
        transaction.due_date= func.now()

        db.session.add(transaction)
        db.session.commit()

        return transaction.to_dict(), 200
    else:
        return {'error': "there is an error"}


# SECTION - UPDATE A TRANSACTION
# TODO - CREATE ERROR HANDLING
@transaction_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_transaction(id):
    to_update = Transaction.query.get(id)
    if to_update:
        form = New_transaction()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(to_update)
            db.session.commit()
            return to_update.to_dict(), 200

    else:
        return {
            'errors': 'Transaction not found',
            "Status code": 404
        }, 404


# SECTION - DELETE TRANSACTION
# TODO -  CREATE ERROR HANDLING
@transaction_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_transaction(id):
    to_delete = Transaction.query.get(id)
    if to_delete:
        db.session.delete(to_delete)
        db.session.commit()
        return {
            'message': 'Transaction successfully deleted',
            'Status code': 302
        }, 302
    else:
        return {
            'errors': 'Transaction not found',
            'Status code': 404
        }, 404
