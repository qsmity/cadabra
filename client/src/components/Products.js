import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../reducers/products'
import { useHistory } from 'react-router-dom'
import tv from '../images/tv.jpg'

const Products = () => {
    const dispatch = useDispatch()
    const productsInStore = useSelector(state => state.products)
    const productsArray = Object.values(productsInStore)
    const history = useHistory()

    const handleClick = (e) => {
        console.log(e.currentTarget.id);
        history.push(`/products/${e.currentTarget.id}`)
    }

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

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
                        return <div key={product.id} className='card' id={product.id-1} onClick={handleClick}>
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