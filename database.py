import requests
from backend.models import User, Product, Category
from backend import app, db
from dotenv import load_dotenv
import os
load_dotenv()


url = "https://amazon-product-reviews-keywords.p.rapidapi.com/product/search"

querystring_one = {"category": "fashion", "country": "US", "keyword": "men"}
querystring_two = {"category": "fashion", "country": "US", "keyword": "women"}
querystring_three = {"category": "aps", "country": "US", "keyword": "iphone"}
querystring_four = {"category": "aps", "country": "US", "keyword": "tv"}
querystring_five = {"category": "aps", "country": "US", "keyword": "xbox"}
querystring_six = {"category": "aps", "country": "US", "keyword": "kitchen"}

headers = {
    'x-rapidapi-host': "amazon-product-reviews-keywords.p.rapidapi.com",
    'x-rapidapi-key': os.environ.get('API_KEY')
}

response_one = requests.request(
    "GET", url, headers=headers, params=querystring_one)
response_one_JSON = response_one.json()
response_two = requests.request(
    "GET", url, headers=headers, params=querystring_two)
response_two_JSON = response_two.json()
response_three = requests.request(
    "GET", url, headers=headers, params=querystring_three)
response_three_JSON = response_three.json()
response_four = requests.request(
    "GET", url, headers=headers, params=querystring_four)
response_four_JSON = response_four.json()
response_five = requests.request(
    "GET", url, headers=headers, params=querystring_five)
response_five_JSON = response_five.json()
response_six = requests.request(
    "GET", url, headers=headers, params=querystring_six)
response_six_JSON = response_six.json()


# aps iphone, fashion women, fashion men, aps tv, aps xbox, aps kitchen

# print(response.text)


with app.app_context():
    db.drop_all()
    db.create_all()

    electronics = Category(name='electronics')
    tv = Category(name='tv')
    men = Category(name='men')
    fashion = Category(name='fashion')
    apple = Category(name='apple')
    women = Category(name='women')
    gaming = Category(name='gaming')
    kitchen = Category(name='kitchen')

    db.session.add_all([electronics, tv, men, fashion,
                        apple, women, gaming, kitchen])

    # men fashion
    for product in response_one_JSON["products"]:
        db.session.add(Product(
            name=product["title"],
            description="comfortable everyday wear",
            price=product["price"]["current_price"],
            before_price=product["price"]["before_price"],
            img_url=product["thumbnail"],
            prime=product["amazonPrime"],
            total_reviews=product["reviews"]["total_reviews"],
            rating=product["reviews"]["rating"],
            categories=[men, fashion]
        )
        )

    # women fashion
    for product in response_two_JSON["products"]:
        db.session.add(Product(
            name=product["title"],
            description="comfortable everyday wear",
            price=product["price"]["current_price"],
            before_price=product["price"]["before_price"],
            img_url=product["thumbnail"],
            prime=product["amazonPrime"],
            total_reviews=product["reviews"]["total_reviews"],
            rating=product["reviews"]["rating"],
            categories=[women, fashion]
        )
        )
    # iphone, electronics, apple
    for product in response_three_JSON["products"]:
        db.session.add(Product(
            name=product["title"],
            description="next generation technology",
            price=product["price"]["current_price"],
            before_price=product["price"]["before_price"],
            img_url=product["thumbnail"],
            prime=product["amazonPrime"],
            total_reviews=product["reviews"]["total_reviews"],
            rating=product["reviews"]["rating"],
            categories=[electronics, apple]
        )
        )

    # tv electronics
    for product in response_four_JSON["products"]:
        db.session.add(Product(
            name=product["title"],
            description="high resolution 4k display",
            price=product["price"]["current_price"],
            before_price=product["price"]["before_price"],
            img_url=product["thumbnail"],
            prime=product["amazonPrime"],
            total_reviews=product["reviews"]["total_reviews"],
            rating=product["reviews"]["rating"],
            categories=[electronics, tv]
        )
        )

    # xbox electronics gaming
    for product in response_five_JSON["products"]:
        db.session.add(Product(
            name=product["title"],
            description="next generation gaming",
            price=product["price"]["current_price"],
            before_price=product["price"]["before_price"],
            img_url=product["thumbnail"],
            prime=product["amazonPrime"],
            total_reviews=product["reviews"]["total_reviews"],
            rating=product["reviews"]["rating"],
            categories=[electronics, gaming]
        )
        )

    # kitchen
    for product in response_six_JSON["products"]:
        db.session.add(Product(
            name=product["title"],
            description="beautiful home/kitchenware design",
            price=product["price"]["current_price"],
            before_price=product["price"]["before_price"],
            img_url=product["thumbnail"],
            prime=product["amazonPrime"],
            total_reviews=product["reviews"]["total_reviews"],
            rating=product["reviews"]["rating"],
            categories=[kitchen]
        )
        )

    demo = User(first_name='demo', last_name='demo', email='demo@example.com',
                password='password')
    db.session.add(demo)

    db.session.commit()

    # tech = Category(name='tech')
    # apparel = Category(name='apparel')
    # samsung = Category(name='samsung')
    # vizio = Category(name='vizio')

    # tv = Product(name='tv', description='55in samsung with high resolution and 4k display. No mount included',
    #              price='350', categories=[tech])
    # tv22 = Product(name='22in vizio tv', description='22in vizio with high resolution and 4k display. mount included',
    #                price='155', categories=[tech])

    # tv.categories.append(samsung)
    # tv22.categories.append(vizio)

    # db.session.add_all([demo, tech, apparel, samsung, tv, tv22])
