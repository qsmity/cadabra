import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Products = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const productsInStore = useSelector(state => state.products)
    const [filterPrice, setFilterPrice] = useState('0,Infinity')

    // restructure the state shape to make it easier to map over later
    // filter the products from the store with the category from the url if match is exitsts (only exists when user navigates to products page from secondary navbar)
    //also filters by price 
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

    //navigate user to correct product details page after selecting product
    const handleClick = (e) => {
        history.push(`/products/${e.currentTarget.id}`)
    }

    //update filter price with the relevant range and cause a rerender in the useEffect
    const updateFilterPrice = (e) => {
        setFilterPrice(e.target.id)
    }

    //making the props the dependency because products comp is being resused so if the user is navigated to the filtered page 
    //the location and match under props should changing causing a rerender
    useEffect(() => {
        //scroll to top of page for rerenders (mainly for price filtering)
        window.scrollTo(0, 0)
    }, [props, filterPrice])

    return (
        <div className='product-container'>
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
            <div className='product'>
                {productsArray.length > 0 ?
                    productsArray.map(product => {
                        //subtracting 1 since the indexed stored id's start at 0 but start at 1 in the db
                        return <div key={product.id} className='card' id={product.id - 1} onClick={handleClick}>
                            {/* make price overlay visible when hovering over image */}
                            <div
                                onMouseEnter={(e) => {
                                    return e.target.classList.toggle('reveal-overlay', true)
                                }}
                                onMouseLeave={(e) => {
                                    return e.target.classList.toggle('reveal-overlay', false)
                                }}
                                className='price-overlay'>

                                <p>${product.price !== 0 ? product.price.toFixed(2): 'discontinued'}</p>

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
                    : <h1>No Results Found</h1>}
            </div>
        </div>
    )
}

export default Products