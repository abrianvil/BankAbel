from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Request, db
from ..forms import New_request


request_routes = Blueprint("requests", __name__)


# SECTION - GET ALL REQUEST
@request_routes.route("/")
@login_required
def get_requests():
    requests = Request.query.all()
    if requests:
        res = []
        for request in requests:
            if (
                request.sender_id == current_user.id
                or request.receiver_id == current_user.id
            ):
                res.append(request.to_dict())
        return {"requests": res}, 200
    else:
        return {"errors": "Requests not found", "Status code": 404}, 404


# SECTION - GET A SINGLE REQUEST
@request_routes.route("/<int:id>")
@login_required
def get_one_request(id):
    request = Request.query.get(id)
    if request:
        return request.to_dict(), 200
    else:
        return {"errors": "Request not found", "Status code": 404}, 404


# SECTION - CREATE A REQUEST
@request_routes.route("/", methods=["POST"])
@login_required
def create_request():
    form = New_request()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        req = Request()
        form.populate_obj(req)
        req.sender_id = current_user.id
        req.status = "pending"
        db.session.add(req)
        db.session.commit()

        return req.to_dict(), 200

    else:
        return {"error": "there is an error"}, 404


# SECTION -  UPDATE A REQUEST
@request_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_request(id):
    to_update = Request.query.get(id)
    if to_update:
        form = New_request()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            form.populate_obj(to_update)
            print("""to_update \n \n \n""", form.data)

            db.session.commit()
            print("""to_update \n \n \n""", to_update.to_dict())
            return to_update.to_dict(), 200
        else:
            print("""\n \n \n""", form.errors)
    else:
        return {"errors": "Request not found", "Status code": 404}, 404


# SECTION - DELETE REQUEST
@request_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_request(id):
    to_delete = Request.query.get(id)
    if to_delete:
        db.session.delete(to_delete)
        db.session.commit()
        return {"message": "Transaction successfully deleted", "Status code": 302}, 302
    else:
        return {"errors": "Request not found", "Status code": 404}, 404
