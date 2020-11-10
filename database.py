from backend.models import User, Product, Category
from backend import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    demo = User(first_name='demo', last_name='demo', email='demo@example.com',
                password='password')

    tech = Category(name='tech')
    apparel = Category(name='apparel')
    samsung = Category(name='samsung')
    vizio = Category(name='vizio')

    tv = Product(name='tv', description='55in samsung with high resolution and 4k display. No mount included',
                 price='350', categories=[tech])
    tv22 = Product(name='22in vizio tv', description='22in vizio with high resolution and 4k display. mount included',
                   price='155', categories=[tech])

    tv.categories.append(samsung)
    tv22.categories.append(vizio)

    db.session.add_all([demo, tech, apparel, samsung, tv, tv22])
    db.session.commit()
