from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        first_name='John',
        last_name='Doe',
        profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/332/non_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg',
        email='demo@aa.io',
        password='password')

    marnie = User(
        username='marnie',
        first_name='Marie',
        last_name='Rose',
        profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg',
        email='marnie@aa.io',
        password='password')

    bobbie = User(
        username='bobbie',
        first_name='Bob',
        last_name='Earl',
        profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
        email='bobbie@aa.io',
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
