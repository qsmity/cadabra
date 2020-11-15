import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import products, { getAllProducts } from '../reducers/products'
import { useHistory } from 'react-router-dom'

const Products = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const productsInStore = useSelector(state => state.products)
    
    // restructure the state shape to make it easier to map over later
    // filter the products from the store with the category from the url if match is exitsts (only exists when user navigates to products page from secondary navbar)
    let productsArray = Object.values(productsInStore)
    if (props.match) {
        const urlCategory = props.match.params.category
        let filteredProducts = productsArray.filter(categoryObj => {
            let productCategories = categoryObj.categories.map(categoryObj => categoryObj.name)
            if (productCategories.includes(urlCategory)) {
                return true
            }
        })
        productsArray = filteredProducts
    }

    //navigate user to correct product details page after selecting product
    const handleClick = (e) => {
        console.log(e.currentTarget.id);
        history.push(`/products/${e.currentTarget.id}`)
    }

    //making the props the dependency because products comp is being resused so if the user is navigated to the filtered page 
    //the location and match under props should changing causing a rerender
    useEffect(() => {
        dispatch(getAllProducts())
    }, [props])

    return (
        <div className='product-container'>
            <div className='product-sidebar'>
                <div className='product-sidebar-price'>
                    <h3>Price:</h3>
                    <p><a>$0 to $50</a></p>
                    <p><a>$50 to $100</a></p>
                    <p><a>over $100</a></p>
                </div>
                <div className='product-sidebar-categories'>
                    {/* to do: grab all categories from categories slice of state */}
                </div>
            </div>
            <div className='product'>
                {productsArray ?
                    productsArray.map(product => {
                        //subtracting 1 since the indexed stored id's start at 0 but start at 1 in the db
                        return <div key={product.id} className='card' id={product.id - 1} onClick={handleClick}>
                            {/* make price overlay visible when hovering over image */}
                            <div
                                onMouseEnter={(e) => {
                                    console.log(e.target.classList)
                                    return e.target.classList.toggle('reveal-overlay', true)
                                }}
                                onMouseLeave={(e) => {
                                    console.log(e.target.classList)
                                    return e.target.classList.toggle('reveal-overlay', false)
                                }}
                                className='price-overlay'>

                                <p>${product.price.toFixed(2)}</p>

                            </div>
                            <div className='card-image-container'>
                                <img className='card-image' src={`${product.img_url}`} alt='tv' />
                            </div>
                            <div className='card-info'>
                                <h4>{product.name}</h4>
                                <p>{product.description}</p>
                                {product.categories ?
                                    <div className='categories'>
                                        {product.categories.map(category => {
                                            return <p key={category.id}>{category.name}</p>
                                        }
                                        )}
                                    </div>
                                    : null
                                }
                            </div>

                        </div>
                    })
                    : null}
            </div>
        </div>
    )
}

export default Products