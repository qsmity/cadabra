from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email
        }

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


product_categories = db.Table('product_categories',
                              db.Column('product_id', db.Integer,
                                        db.ForeignKey('products.id')),
                              db.Column('category_id', db.Integer,
                                        db.ForeignKey('categories.id'))
                              )


class Product(db.Model, UserMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    before_price = db.Column(db.Float, nullable=False)
    img_url = db.Column(db.String(255), nullable=True)
    prime = db.Column(db.Boolean, default=False)
    total_reviews = db.Column(db.Integer)
    rating = db.Column(db.Float)

    categories = db.relationship(
        'Category', secondary=product_categories, backref='products')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'before_price': self.before_price,
            'img_url': self.img_url,
            'prime': self.prime,
            'total_reviews': self.total_reviews,
            'rating': self.rating
        }

    def __repr__(self):
        return f'<{self.id} {self.name} {self.description} {self.price}>'


class Category(db.Model, UserMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

