from app.models import db, Wallet, environment, SCHEMA

def seed_wallets():
    wallet1= Wallet(
        user_id=1,
        total_fund=100000
    )

    wallet2=Wallet(
        user_id=2,
        total_fund=10000
    )

    wallet3= Wallet(
        user_id=3,
        total_fund=1000
    )

    db.session.add(wallet1)
    db.session.add(wallet2)
    db.session.add(wallet3)
    db.session.commit()


def undo_wallets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wallets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM wallets")

    db.session.commit()
