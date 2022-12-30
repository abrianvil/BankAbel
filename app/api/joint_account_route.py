from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Joint_account, db
from ..forms import New_joint_account

joint_account_routes=Blueprint('joint_accounts', __name__)


