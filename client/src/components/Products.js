import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../reducers/products'
import tv from '../images/tv.jpg'

const Products = () => {
    const dispatch = useDispatch()
    const productsInStore = useSelector(state => state.products)
    const productsArray = Object.values(productsInStore)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    return (
        <>
            <div className='sidebar'>hello</div>
            <div className='product'>
                {productsArray ?
                    productsArray.map(product => {
                        return <div key={product.id} className='card'>
                            <div className='card-image-container'>
                                <img className='card-image' src={tv} alt='tv' />
                            </div>
                            <h2>{product.name}</h2>
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
                    })
                    : null}
            </div>
        </>
    )
}

export default Products