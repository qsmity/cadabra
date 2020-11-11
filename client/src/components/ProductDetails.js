import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as FAIcons from 'react-icons/fa';


const ProductDetail = (props) => {
    const { match } = props
    const productId = match.params.id
    const products = useSelector((state) => state.products)
    const [selectedProduct, setSelectedProduct] = useState('')
    // const categories = Object.values(selectedProduct.categories)

    useEffect(() => {
        //set selected/searched product when productId changes (new product details page searched)
        ((id) => {
            setSelectedProduct(products[id])
        })(productId)

    }, [productId])

    console.log(selectedProduct)
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
                        <p>Price: <span className='price-color'>${selectedProduct.price}</span> & <strong>Free Shipping</strong></p>
                    </div>

                    <div className='product-info-about'>
                        <h3>About: </h3>
                        <p><FAIcons.FaAngleRight className='skip-foward' /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <p><FAIcons.FaAngleRight className='skip-foward' /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <p><FAIcons.FaAngleRight className='skip-foward' /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>
                <div className='buy-sidebar'>
                    <p><span className='price-color'>${selectedProduct.price}</span></p>

                </div>
            </div>
            <div className='related-products'>related products</div>
        </div>
    )
}

export default ProductDetail; 