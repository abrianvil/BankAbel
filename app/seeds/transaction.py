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
        sender_id=2,
        receiver_id=3,
        amount=99.99,
        due_date=datetime.date(2022,12,20),
        status='pending'
    )


    db.session.add(trans1)
    db.session.add(trans2)
    db.session.commit()


def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transactions")

    db.session.commit()
