from backend.models import User
from backend import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    demo = User(first_name='demo', last_name='demo', email='demo@example.com',
                password='password')

    db.session.add(demo)

    db.session.commit()
