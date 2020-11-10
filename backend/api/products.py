from flask import Blueprint, jsonify
from ..models import Product, Category
from sqlalchemy.orm import joinedload

products = Blueprint('products', __name__)


@products.route('/')
def get_all_products():
    products = Product.query.join(Product.categories).all()
    print({'products': products})
    # return all products with a list of categories
    return {'products': [dict(product.to_dict(), categories=[category.to_dict() for category in product.categories]) for product in products]}  # noqa
