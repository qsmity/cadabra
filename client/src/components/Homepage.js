import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import cadabraBlackFriday from '../images/cadabraBlackFriday.png'

const Homepage = () => {

    const productsInStore = useSelector(state => state.products)
    const productsArray = Object.values(productsInStore)
    const [epicDailyDealRandomNum, setEpicDailyDealRandomNum] = useState(0)
    console.log('random', epicDailyDealRandomNum)
    const history = useHistory()

    const handleClick = (e) => {
        console.log(e.currentTarget.id);
        history.push(`/products/${e.currentTarget.id}`)
    }

    useEffect(() => {
        setEpicDailyDealRandomNum(Math.floor(Math.random() * Math.floor(productsArray.length)))
    }, [])


    return (
        <>
            <div className='homepage-background-container'>
                <div className='homepage-background-primary'>
                    <img src={cadabraBlackFriday}></img>
                </div>
                <div className='homepage-background-secondary'>
                </div>
            </div>
            <div className='category-snapshot'>
                <div className='snapshot-container'>
                    <h3 className='snapshot-title'>Shop Electronics</h3>
                    {productsArray ?
                        productsArray.map(product => {
                            //subtracting 1 since the indexed stored id's start at 0 but start at 1 in the db
                            return <div key={product.id} id={product.id - 1} onClick={handleClick}>
                                <div>
                                    <img src={`${product.img_url}`} alt='tv' />
                                </div>
                            </div>
                        }).slice(0, 4)
                        : null}
                </div>
                <div className='snapshot-container'>
                    <h3 className='snapshot-title'>Shop Fashion</h3>
                    {productsArray ?
                        productsArray.map(product => {
                            //subtracting 1 since the indexed stored id's start at 0 but start at 1 in the db
                            return <div key={product.id} id={product.id - 1} onClick={handleClick}>
                                <div>
                                    <img src={`${product.img_url}`} alt='tv' />
                                </div>
                            </div>
                        }).slice(productsArray.length - 4)
                        : null}
                </div>
                <div className='snapshot-container'>
                    <h3 className='snapshot-title'>Epic Daily Deal</h3>
                    {productsArray ?
                        productsArray.map(product => {
                            //subtracting 1 since the indexed stored id's start at 0 but start at 1 in the db
                            return <div key={product.id} id={product.id - 1} className='epic-daily-deal' onClick={handleClick}>
                                <div>
                                    <img src={`${product.img_url}`} alt='tv' />
                                    <div className='epic-deal'>
                                        <p>Epic Deal</p>
                                    </div>
                                    <p>{product.name}</p>
                                </div>

                            </div>
                        })[epicDailyDealRandomNum]
                        : null}
                </div>
            </div>
        </>
    )
}

export default Homepage;