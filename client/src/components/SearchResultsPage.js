import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const SearchResults = (props) => {

    const searchTerm = props.match.params.term
    const history = useHistory()
    const productsInStore = useSelector(state => state.products)
    const [filterPrice, setFilterPrice] = useState('0,Infinity')

    //search filter by term and price
    let productsArray = Object.values(productsInStore).filter(product => {
        let [startPrice, endPrice] = filterPrice.split(',')
        if (product.name.toLowerCase().includes(searchTerm.toLowerCase()) && Number(product.price) >= Number(startPrice) && Number(product.price) <= Number(endPrice)) {
            return true
        }
    })


    //update filter price with the relevant range and cause a rerender in the useEffect
    const updateFilterPrice = (e) => {
        setFilterPrice(e.target.id)
    }

    //navigate user to correct product details page after selecting product
    const handleClick = (e) => {
        history.push(`/products/${e.currentTarget.id}`)
    }

    //just used to rerender search page if search term changes
    useEffect(() => {

    }, [props])

    return (
        <div className='product-container'>
            <div className='product-sidebar'>
                <div className='product-sidebar-price'>
                    <h3>Price:</h3>
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

                                <p>${product.price !== '0' ? product.price.toFixed(2) : 'discontinued'}</p>

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

export default SearchResults