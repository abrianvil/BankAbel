from app.models import db, User, environment, SCHEMA
# from app.images import Cc


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Belou',
        first_name='Abel',
        last_name='Brianvil',
        # profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/332/non_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg',
        profile_pic='https://media.licdn.com/dms/image/D4E35AQH73avELZq3nA/profile-framedphoto-shrink_200_200/0/1670451896071?e=1671775200&v=beta&t=EpK8ghLiUgpcnfsn2xAjUllKzEyt-73COFP9Q7h9948',
        email='demo@aa.io',
        password='password')

    marnie = User(
        username='Cece',
        first_name='Cindy',
        last_name='Rose',
        # profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg',
        profile_pic='https://media.licdn.com/dms/image/D5635AQFlKjFxuSgCpg/profile-framedphoto-shrink_800_800/0/1670528981919?e=1671775200&v=beta&t=_eDaCAD3xmklu7JInaIaFwPvqs2ATcJdDV7aW8ahJtQ',
        email='cece@aa.io',
        password='password')

    bobbie = User(
        username='David',
        first_name='David',
        last_name='Burch',
        # profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
        profile_pic='https://media.licdn.com/dms/image/D5635AQEdnHkvrYatyw/profile-framedphoto-shrink_800_800/0/1668390952500?e=1671775200&v=beta&t=kmPS3I09Z5LVDC3puCGs7hN2hDS8hI1dcttxdV9DR2M',
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
