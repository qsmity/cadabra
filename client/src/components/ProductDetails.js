import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as FAIcons from 'react-icons/fa';
import { useHistory } from 'react-router-dom'


const ProductDetail = (props) => {
    const { match } = props
    
    //grap product id form the url
    const productId = match.params.id

    const history = useHistory()
    const products = useSelector((state) => state.products)
    
    //useEffect finds the selected product in store using the productsId from the url to have access to it's info
    const [selectedProduct, setSelectedProduct] = useState('')

    //disabled booleans for left and right carousel buttons
    const [leftDisabled, setLeftDisabled] = useState(true)
    const [rightDisabled, setRightDisabled] = useState(false)

    //keep track of current page of carousel to display dynamically
    const [currentPage, setCurrentPage] = useState(1)
    const [x, setX] = useState(0)
    
    const relatedCategories = []
    
    //handle click to navigate to product details page
    const handleClick = (e) => {
        console.log(e.currentTarget.id);
        history.push(`/products/${e.currentTarget.id}`)
    }

    //move carousel left and right 100% when right or left button is pressed
    const moveRight = () => {
            setCurrentPage(currentPage + 1)
            setX(x - 100)
            if(x == -100){
                setRightDisabled(true)
            } else {
                setLeftDisabled(false)
            }
            console.log(x);
    }

    const moveLeft = () => {
        setCurrentPage(currentPage + -1)
        setX(x + 100)
        if(x == -100){
            setLeftDisabled(true)
        } else {
            setRightDisabled(false)
        }
    }

    //filters products to first 9 products with same category
    const related = (categories) => {
        //loop through all products in store to find all products with same category
        for (let category of categories) {
            const productsArray = Object.values(products)
            for (let product of productsArray) {
                const productCategories = product.categories.map(categoryObj => categoryObj.name)
                if (productCategories.includes(category.name)) {
                    relatedCategories.push(product)
                }
            }
        }
    }

    //call related func before comp is done mounting to be run before useEffect
    related(products[productId].categories)

    useEffect(() => {
        //set selected/searched product when productId changes (new product details page searched)
        //grab all items products with same categories for related section
        ((id) => {
            setSelectedProduct(products[id])

        })(productId);

    }, [productId])

    return (
        <div className='product-details-container'>

            <div className='product-details'>

                <div className='product-details__image-container'>
                    <img src={selectedProduct.img_url} alt={`${selectedProduct.description}`} />
                </div>

                <div className='product-info-container'>

                    <div className='product-info-header'>
                        <h2>{selectedProduct.name}</h2>
                        <p> {selectedProduct.total_reviews} totals reviews | rating: {selectedProduct.rating} </p>
                    </div>

                    <div className='product-info-price'>

                        {/* only display cadabras choice if price was reduced */}
                        {selectedProduct.before_price != 0 ?
                            <>
                                <div className='cadabra-choice'>
                                    <p>Cadabra's <span className='choice'>Choice</span></p>
                                </div>
                                {/*map over categories to display*/}
                                <span className='cadbra-choice-categories'>for {selectedProduct.categories ? selectedProduct.categories.map(category => category.name + ' ') : null} </span>
                            </>
                            : null}

                        {/* only display before price if it is not 0 since the api return 0 for products with no reduced price */}
                        {selectedProduct.before_price != 0 ?
                            <p>Previous Price: $<span className='previous-price'>{selectedProduct.before_price}</span></p>
                            : null}
                        <p>Price: <span className='price-color'>${selectedProduct.price ? selectedProduct.price.toFixed(2) : null}</span> & <strong>Free Shipping</strong></p>
                    </div>

                    <div className='product-info-about'>
                        <h3>About: </h3>
                        <p><FAIcons.FaAngleRight className='skip-foward' /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <p><FAIcons.FaAngleRight className='skip-foward' /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <p><FAIcons.FaAngleRight className='skip-foward' /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>

                <div className='buy-sidebar'>
                    <p><span className='price-color'>${selectedProduct.price ? selectedProduct.price.toFixed(2) : null}</span></p>
                    <p><span className='in-stock'>In Stock</span></p>
                    <label htmlFor='number'>Qty: </label>
                    <input type='number' className='input-number' id='number' name='number' placeholder='0' />
                    <button><FAIcons.FaShoppingCart />  Add to Cart</button>
                    <button><FAIcons.FaRegMoneyBillAlt />  Buy Now</button>
                </div>

            </div>
            <div className='related-products-container'>

                <button onClick={moveLeft} disabled={leftDisabled}><FAIcons.FaAngleLeft /></button>
                <button onClick={moveRight} disabled={rightDisabled}><FAIcons.FaAngleRight /></button>

                <div className='related-products-header'> 
                    <h4>Products related to this product</h4>
                    <p>page {currentPage} of 3</p>
                </div>

                <div className='related-products'>
                    <div id='page1' className='carousel carousel-page1' style={{ transform: `translateX(${x}%)` }}>
                        {relatedCategories.length != 0 ? relatedCategories.map(product => {
                            return <div key={product.id} id={product.id-1} className='item' onClick={handleClick}>
                                <div >
                                    <img src={`${product.img_url}`} alt='tv' />
                                </div>
                                <div className='card-info'>
                                    <h4>{product.name}</h4>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                        }).slice(0, 3) : null}
                    </div>

                    <div id='page2' className='carousel carousel-page2' style={{ transform: `translateX(${x}%)` }}>
                        {relatedCategories.length != 0 ? relatedCategories.map(product => {
                            return <div key={product.id} id={product.id-1} className='item' onClick={handleClick}>
                                <div >
                                    <img src={`${product.img_url}`} alt='tv' />
                                </div>
                                <div className='card-info'>
                                    <h4>{product.name}</h4>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                        }).slice(3, 6) : null}
                    </div>

                    <div id='page3' className='carousel carousel-page3' style={{ transform: `translateX(${x}%)` }}>
                        {relatedCategories.length != 0 ? relatedCategories.map(product => {
                            return <div key={product.id} id={product.id-1} className='item' onClick={handleClick}>
                                <div >
                                    <img src={`${product.img_url}`} alt='tv' />
                                </div>
                                <div className='card-info'>
                                    <h4>{product.name}</h4>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                        }).slice(6, 9) : null}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetail; 