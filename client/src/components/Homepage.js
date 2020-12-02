import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import blackFridayLogo from '../images/cadabraBlackFriday.png'
import { getAllProducts } from '../reducers/products'
import Footer from './Footer'


const Homepage = (props) => {
    const dispatch = useDispatch()
    const currentUser = props.currentUser

    const productsInStore = useSelector(state => state.products)
    const productsArray = Object.values(productsInStore)
    const [epicDailyDealRandomNum, setEpicDailyDealRandomNum] = useState(0)
    const history = useHistory()

    const handleClick = (e) => {
        history.push(`/products/${e.currentTarget.id}`)
    }

    //send user to login page if signin button on navbar pressed
    const handleSigninClick = (e) => {
        history.push('/login')
    }

    useEffect(() => {
        setEpicDailyDealRandomNum(Math.floor(Math.random() * Math.floor(productsArray.length)))
        dispatch(getAllProducts())

    }, [])


    return (
        <>
            <div className='homepage-background-container'>
                <div className='homepage-background-primary'>
                    <img src={blackFridayLogo} alt='blackfriday logo'></img>
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
                        }).slice(146, 150)
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
                                    {/*slice the name after 50 characters so name doesnt flow outside div */}
                                    <p>{product.name.length > 50 ? product.name.slice(0, 50) + '...' : product.name}</p>
                                </div>

                            </div>
                        // randomly select epic daily deal
                        })[epicDailyDealRandomNum]
                        : null}
                </div>
                <div className='snapshot-container'>
                    <h3 className='snapshot-title'>Shop Women's</h3>
                    {productsArray ?
                        productsArray.map(product => {
                            //subtracting 1 since the indexed stored id's start at 0 but start at 1 in the db
                            return <div key={product.id} id={product.id - 1} onClick={handleClick}>
                                <div>
                                    <img src={`${product.img_url}`} alt='tv' />
                                </div>
                            </div>
                        }).slice(87, 91)
                        : null}
                </div>
                {currentUser.id ? null : <div id='signin-card' className='snapshot-container'>
                    <h3>Sign in experience is better</h3>
                    <button onClick={handleSigninClick}>Sign In</button>
                </div>}
                <div className='snapshot-container'>
                    <h3 className='snapshot-title'>Shop Men's</h3>
                    {productsArray ?
                        productsArray.map(product => {
                            //subtracting 1 since the indexed stored id's start at 0 but start at 1 in the db
                            return <div key={product.id} id={product.id - 1} onClick={handleClick}>
                                <div>
                                    <img src={`${product.img_url}`} alt='tv' />
                                </div>
                            </div>
                        }).slice(28, 32)
                        : null}
                </div>
                <div className='snapshot-container'>
                    <h3 className='snapshot-title'>Shop Gaming</h3>
                    {productsArray ?
                        productsArray.map(product => {
                            //subtracting 1 since the indexed stored id's start at 0 but start at 1 in the db
                            return <div key={product.id} id={product.id - 1} onClick={handleClick}>
                                <div>
                                    <img src={`${product.img_url}`} alt='tv' />
                                </div>
                            </div>
                        }).slice(178, 182)
                        : null}
                </div>
                <div className='snapshot-container'>
                    <h3 className='snapshot-title'>Shop Kitchen</h3>
                    {productsArray ?
                        productsArray.map(product => {
                            //subtracting 1 since the indexed stored id's start at 0 but start at 1 in the db
                            return <div key={product.id} id={product.id - 1} onClick={handleClick}>
                                <div>
                                    <img src={`${product.img_url}`} alt='tv' />
                                </div>
                            </div>
                        }).slice(184, 188)
                        : null}
                </div>
            </div>
            <Footer marginClass={'homepage-footer-margin footer'}/>
        </>
    )
}

export default Homepage;