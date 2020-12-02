[live Link](https://aa-cadabra.herokuapp.com/)

![Cadabra](readmeImages/Cadabra.gif)

## Table of Contents
- [Technologies](#Technologies)
- [Notable Packages](#Notable-Packages)
- [Installation](#Installation)
- [Model Schema](#Model-Schema)
- [Features Overview](#Features-Overview)
   - [Price Filtering](#Price-Filtering)
   - [Search Filtering](#Search-Filtering)
   - [Dynamic Display of Prices](#Dynamic-Display-of-Prices)
   - [Related Products Carousel](#Related-Products-Carousel)
   - [Amazon API Seed Data](#Amazon-API-Seed-Data)
- [Todo](#Todo)

> Current Status: on-going devlopment
## Technologies
- Flask
- SQLAlchemy
- PostgreSQL
- React/Redux
- Heroku/Docker deploy

## Notable Packages 
- Front End
    - Sass
    - React Icons
    - Amazon product review API
- Back End
    - Back End
    - WTForms
    - requests
    - FlaskMigrate

## Installation
1. Clone the repository

   ```bash
   $ git clone https://github.com/qsmity/cadabra.git
   ```
2. Install dependencies
   ```bash
   $ pipenv install --dev -r dev-requirements.txt --python=python3 && pipenv install -r requirements.txt
   $ pipenv install alembic Flask-Migrate
   ```

3. Open psql and create user and database

   - Create user "cadabra" with password "<<super_strong_secret_password>>"
   - Create database cadabra_dev_db with owner cadabra


4. Create .flaskenv with:
    ```bash
   FLASK_APP=starter_app
   FLASK_ENV=development
   ```

5. create a .env and add configuration modeled below: 

   ```
   DATABASE_URL=postgresql://username:password@localhost/database_name
   SECRET_KEY=<<super_secret_key>>
   API_KEY=<<register for API key>>
   ```
   >note: Sign up for an API key with Amazon product reviews API and add to .env file to seed the database later


6. migrate to database

   ``` pipenv shell
    $ flask db init
    $ flask db migrate 
    $ flask db upgrade
   ```

5. Activate python shell and seed database

   ```bash
   $ pipenv shell
   ```

   ```
   $ python -m database && flask run
   ```

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:
   ```bash
    $ pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   $ psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.

## Model Schema
![Model Schema](readmeImages/CadabraModelSchema.png)

## Features Overview
Cadabra is an Amazon-inspired , read heavy, E-commerce web application that retrieves and displays product information with a smooth and modernly designed user interface. Fun Fact: Did you know Amazon was to be called 'Cadabra' before it's official name back in 1995? 

I originally wanted to scrape amazon product information from the illustrious site, but quickly found that path risky, for data scraping isn't approved in the robot.txt file. Cadabra has about 350 products pulled from the Amazon product review API and has the ability to to be scaled up in the database, but API key rate limiting was a blocker for extracting more data. I am confident that enough data was pulled to express my vision of producing a model of the original site. 

### Price Filtering
*** 

Price filtering is a major MVP of online E-commerce sites so I wanted to incorporate it. A sidebar was made on the `/products` page housing the price filtering options. Each price range was embeded with an id that has a string of the start price and end price range (ex. `id={'${0},${Infinity}'}` ), so that when the `p` tag is clicked the filter fuction is called with the start and end range passed in from the `event.target.id` object. 

```js

// Products.js component
    <div className='product-sidebar'>
      <div className='product-sidebar-price'>
         <h3>Price:</h3>                     {/* id='0,100' */}
         <p onClick={updateFilterPrice} id={`${0},${Infinity}`}>all prices</p>
         <p onClick={updateFilterPrice} id={`${0},${50}`}>$0 to $50</p>
         <p onClick={updateFilterPrice} id={`${50},${100}`}>$50 to $100</p>
         <p onClick={updateFilterPrice} id={`${100},${Infinity}`}>over $100</p>
      </div>
      <div className='product-sidebar-categories'>
         {/* to do: grab all categories from categories slice of state */}
      </div>
   </div>
```

Filtering function: 
```js
// Products.js component

   // filter the products from the store with the category from the url if match is exists (only exists when user navigates to products page from secondary navbar)
    //ftn also filters by price 
    let productsArray = Object.values(productsInStore)
    if (props.match.params.category) {
        productsArray = Object.values(productsInStore)
        const urlCategory = props.match.params.category
        let [startPrice, endPrice] = filterPrice.split(',')
        let filteredProducts = productsArray.filter(product => {
            let productCategories = product.categories.map(categoryObj => categoryObj.name)
            //filter by price range and category
            if (productCategories.includes(urlCategory) && Number(product.price) >= Number(startPrice) && Number(product.price) <= Number(endPrice)) {
                return true
            }
        })
        productsArray = filteredProducts
    } else {
        //filter option for the explore navlink that will display all products
        productsArray = Object.values(productsInStore)
        let [startPrice, endPrice] = filterPrice.split(',')
        let filteredProducts = productsArray.filter(product => {
            //filter by price range 
            if (Number(product.price) >= Number(startPrice) && Number(product.price) <= Number(endPrice)) {
                return true
            }
        })
        productsArray = filteredProducts
    }
```
Instead of having to make a separate component for category search results, I decided to use the same component and just build a function that filters by category and price if the URL matches a category search: 

```js
let filteredProducts = productsArray.filter(product => {
   let productCategories = product.categories.map(categoryObj => categoryObj.name)
   //filter by price range and category
   if (productCategories.includes(urlCategory) && Number(product.price) >= Number(startPrice) && Number(product.price) <= Number(endPrice)) {
         return true
   }
``` 
or just by price if the user is on the `/products` page that displays all products: 
```js
let filteredProducts = productsArray.filter(product => {
   //filter by price range 
   if (Number(product.price) >= Number(startPrice) && Number(product.price) <= Number(endPrice)) {
         return true
   }
})
```
> Note: Big O analysis for the `category` and `price` condition is O(n<sup>2</sup>) because of the nested `includes()` method inside of the `filter()` method, and `O(n)` for just the price filtering for the stand alone `filter()` function. I plan on optimizing the O(n<sup>2</sup>) in the future, but currently filtering is fast with the 300+ products in the  Redux store. 

API calls to the Back End are reduced by making one call to the database to retrieve all the products when the user loads the site, (done in the `useEffect()` of `"/"` route): 

```js
//Homepage.js component

   useEffect(() => {
        setEpicDailyDealRandomNum(Math.floor(Math.random() * Math.floor(productsArray.length)))
        dispatch(getAllProducts())

    }, [])
```
 So further filtering is done on products in the redux store. 


### Search Filtering
***

The search filtering parallels the price filtering in theory, but I decided to make it it's own component to avoid making the `Products.js` component too complicated and make it more modular. The products from the Redux store are filtered out based on the inclusion of the search term from the navbar search field. The `searchResultPage.js` component also has the ability to be filtered by price which starts with the range of `0 `to `Infinity` to grab all products with the search term, and the `useEffect()` re-renders the `searchResultPage.js` component if the url changes (which happens if a price filter is clicked): 

```js
// searchResultPage.js component 

//search filter by term and price
    let productsArray = Object.values(productsInStore).filter(product => {
        let [startPrice, endPrice] = filterPrice.split(',')
        if (product.name.toLowerCase().includes(searchTerm.toLowerCase()) && Number(product.price) >= Number(startPrice) && Number(product.price) <= Number(endPrice)) {
            return true
        }
    })
```

### Dynamic Display of Prices
***

Each product page is dynamically created by fetching a particular product in the Redux store by extracting it from the url from either the `/` (homepage) route, `/products` route, or `/products/search/:productName` route. Since the product id is stored as the key for the products object in the Redux store state shape (ex. `{0: {id: 0, name: 'tv' , category: [], ... } } `), it is easy to extract. The `ProductDetail.js` component displays the product info from that object: 

```js
   <div className='product-info-price'>
      {/* only display cadabras choice if price was reduced */}
      {selectedProduct.before_price !== 0 ?
            <>
               <div className='cadabra-choice'>
                  <p>Cadabra's <span className='choice'>Choice</span></p>
               </div>
               {/*map over categories to display*/}
               <span className='cadbra-choice-categories'>for {selectedProduct.categories ? selectedProduct.categories.map(category => category.name + ' ') : null} </span>
            </>
            : null}

      {/* only display before price if it is not 0 since the api return 0 for products with no reduced price */}
      {selectedProduct.before_price !== 0 ?
            <p>Previous Price: $<span className='previous-price'>{selectedProduct.before_price}</span></p>
            : null}
      <p>Price: <span className='price-color'>${selectedProduct.price ? selectedProduct.price.toFixed(2) : ' discontinued'}</span> & <strong>Free Shipping</strong></p>
   </div>

```

Just as a fun detail, a `Cadabra's Choice` flag is added conditionally to all products that have a sale price (have a `before price` from the Amazon API that is not $0)

### Related Products Carousel
***
The related products Carousel was one of the most challenging feats to accomplish. There are a hundred different ways to tackle a carousel so I tried to keep it simple as possible. I did not wish to import a carousel library, for I wanted the challenge to code it from scratch. It was quite rewarding. 🌟🌟🌟

The css grid functionality was used to implement this. 3 columns were created spanning 100% in width. Each column houses 3 related products that are sliced from the first 9 results that are in the same category as the current selected product on the `/products/:productId` page. 
Two methods were added to the `ProductDetails.js` components: 

```js
// ProductDetail.js component 

//move carousel left and right 100% when right or left button is pressed
    const moveRight = () => {
            setCurrentPage(currentPage + 1)
            setX(x - 100)
            if(x === -100){
                setRightDisabled(true)
            } else {
                setLeftDisabled(false)
            }
    }

    const moveLeft = () => {
        setCurrentPage(currentPage + -1)
        setX(x + 100)
        if(x === -100){
            setLeftDisabled(true)
        } else {
            setRightDisabled(false)
        }
    }
```
Each time the one of the angled buttons is pressed in the carousel... 

```js
 <button onClick={moveLeft} disabled={leftDisabled}><FAIcons.FaAngleLeft /></button>
                <button onClick={moveRight} disabled={rightDisabled}><FAIcons.FaAngleRight /></button>
```
...the grid column is move either to the right or left `100%` on the `x` axis. 

The div that ecompasses the grid has an inline style utilizing the `transform` property to move the x axis when the state of x ( `const [x, setX] = useState(0)`) changes: 

```js
 <div id='page1' className='carousel carousel-page1' style={{ transform: `translateX(${x}%)` }}>
 ```
### Amazon API Seed Data
***
The Amazon API came in handy to populate the database quickly. 5 separate API calls are made to the Amazon API to grab the first page of paginated products from the `womens`, `men`, `iphone`, `tv`, `kitchen` category search terms. This is added in the `queryString` object of the request. Each product returned in the json objects is mapped over to populate the correct fields and transferred to the `SQLAlchemy` ORM to add to the database tables. The changes are then commited and the connection to the db is closed using the `with` wrapper in Python. 

```py
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

```

The `database.py` is then ran separately as a module to execute the file and recognize the necessary imports made at the top of the file. 
> Note: only 25 pings were allowed with each API key so each call was costly, and I had to make sure to avoid infinite loops. Each time this file is ran, 5 API calls are made. 

## Todo
- [ ] Display validation errors on login/signup page (functionality already set up in Back End)
- [ ] Add cart model / ability to add items to a cart
- [ ] Add E-commerce (demo paypal account)
- [ ] Optimize search algo for search field 
- [ ] Add pagination for products
- [ ] Add magnifying feature for product image
