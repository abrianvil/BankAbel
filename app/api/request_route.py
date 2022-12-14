from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Request, db
from ..forms import New_request


request_routes=Blueprint('requests', __name__)


# SECTION - GET ALL REQUEST 
