from app.models import db, Request, environment, SCHEMA


def seed_requests():
    req1= Request(
        sender_id=1,
        receiver_id=2,
        amount=100,
        message='can you send your part for the party?',
        status='pending',
        )

    req2= Request(
        sender_id=1,
        receiver_id=3,
        amount=100,
        message='can you send your part for the party?',
        status='pending',
    )


    req3= Request (
        sender_id=2,
        receiver_id=1,
        amount=100,
        message='we are getting a table tonight',
        status='pending',
    )

    req4= Request(
        sender_id=2,
        receiver_id=3,
        amount=100,
        message='losers pay up',
        status='pending',
    )

    req5= Request(
        sender_id=3,
        receiver_id=1,
        amount=100,
        message='It is fantasy football time!',
        status='pending',
    )

    req6= Request(
        sender_id=3,
        receiver_id=2,
        amount=100,
        message='we are 100 off for the grill',
        status='pending',
    )


    db.session.add(req1)
    db.session.add(req2)
    db.session.add(req3)
    db.session.add(req4)
    db.session.add(req5)
    db.session.add(req6)
    db.session.commit()



def undo_requests():
    pass
