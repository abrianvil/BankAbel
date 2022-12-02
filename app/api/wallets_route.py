from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Wallet, db
from ..forms import New_wallet


wallet_routes = Blueprint('wallets', __name__)


# SECTION - GET WALLETS
# TODO - CREATE ERROR HANDLING
@wallet_routes.route('/')
@login_required
def get_wallet():
    wallet = (Wallet.query.filter(Wallet.user_id == current_user.id)).one()
    return {'wallet': wallet.to_dict()}


# SECTION - UPDATE WALLET
# TODO - CREATE ERROR HANDLING
@wallet_routes.route('/', methods=['PUT'])
@login_required
def update_wallet():
    to_update = (Wallet.query.filter(Wallet.user_id == current_user.id)).one()
    if to_update:
        form = New_wallet()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(to_update)
            db.session.commit()
            return to_update.to_dict(), 201
        else:
            return{'errors': form.errors},404
    else:
        return {
            'errors': 'wallet not found',
            'code': 404
        }, 404
