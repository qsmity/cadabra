import requests
from backend.models import User, Product, Category
from backend import app, db
from dotenv import load_dotenv
load_dotenv()


url = "https://amazon-product-reviews-keywords.p.rapidapi.com/product/search"

querystring = {"category": "aps", "country": "US", "keyword": "tv"}

headers = {
    'x-rapidapi-host': "amazon-product-reviews-keywords.p.rapidapi.com",
    'x-rapidapi-key': "ca3e0ee5e8mshabec08f1c7eccfap189f9djsn9cc0114ba406"
}

response = requests.request("GET", url, headers=headers, params=querystring)

response_JSON = response.json()
print(response.text)


with app.app_context():
    db.drop_all()
    db.create_all()

    electronics = Category(name='electronics')
    tv = Category(name='tv')

    db.session.add(electronics)
    db.session.add(tv)

    for product in response_JSON["products"]:
        db.session.add(Product(
            name=product["title"],
            description="high resolution flat screen tv",
            price=product["price"]["current_price"],
            before_price=product["price"]["before_price"],
            img_url=product["thumbnail"],
            prime=product["amazonPrime"],
            total_reviews=product["reviews"]["total_reviews"],
            rating=product["reviews"]["rating"],
            categories=[electronics, tv]
        )

        )

    # demo = User(first_name='demo', last_name='demo', email='demo@example.com',
    #             password='password')

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
    db.session.commit()
