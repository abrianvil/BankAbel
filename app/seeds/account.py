from app.models import db, Account, environment, SCHEMA


def seed_accounts():
    acc1= Account(
        name='Savings',
        balance=100,
        user_id=1
    )

    acc2= Account(
        name='Checking',
        balance=100,
        user_id=1
    )

    acc3= Account(
        name='Savings',
        balance=100,
        user_id=2
    )

    acc4= Account(
        name='Checking',
        balance=100,
        user_id=2
    )

    acc5= Account(
        name='Savings',
        balance=100,
        user_id=3
    )

    acc6= Account(
        name='Checking',
        balance=100,
        user_id=3
    )


    db.session.add(acc1)
    db.session.add(acc2)
    db.session.add(acc3)
    db.session.add(acc4)
    db.session.add(acc5)
    db.session.add(acc6)
    db.session.commit()


def undo_accounts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.accounts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM accounts")

    db.session.commit()
