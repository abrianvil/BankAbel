from app.models import db, Transaction, environment, SCHEMA
import datetime


def seed_transactions():
    trans1= Transaction(
        sender_id=1,
        receiver_id=3,
        amount=99.99,
        due_date=datetime.date(2022,12,20),
        status='pending'
    )

    trans2= Transaction(
        sender_id=1,
        receiver_id=2,
        amount=99.99,
        due_date=datetime.date(2022,12,20),
        status='pending'
    )

    trans3= Transaction(
        sender_id=2,
        receiver_id=1,
        amount=99.99,
        due_date=datetime.date(2022,12,20),
        status='pending'
    )

    trans4= Transaction(
        sender_id=2,
        receiver_id=3,
        amount=99.99,
        due_date=datetime.date(2022,12,20),
        status='pending'
    )

    trans5= Transaction(
        sender_id=3,
        receiver_id=1,
        amount=99.99,
        due_date=datetime.date(2022,12,20),
        status='pending'
    )

    trans6= Transaction(
        sender_id=3,
        receiver_id=2,
        amount=99.99,
        due_date=datetime.date(2022,12,20),
        status='pending'
    )

    db.session.add(trans1)
    db.session.add(trans2)
    db.session.add(trans3)
    db.session.add(trans4)
    db.session.add(trans5)
    db.session.add(trans6)
    db.session.commit()


def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transactions")

    db.session.commit()
