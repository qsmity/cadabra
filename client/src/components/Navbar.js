import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategories } from '../reducers/categories'
import { useHistory } from 'react-router-dom'
import logo from '../images/Cadabra2.png'
import * as AuthAction from '../reducers/session';

const Navbar = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const categories = useSelector(state => state.categories)
    const [searchTerm, setSearchTerm] = useState('')
    const currentUser = useSelector(state => state.session)

    //send user to homepage after clicking on logo
    const handleImgClick = () => {
        history.push('/')
    }

    //send user to filtered products page 
    const handleCategoryClick = (e) => {
        history.push(`/products/filtered/${e.target.id}`)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        //if nothing is entered in the search go to explore page with all products
        if (searchTerm === '') {
            history.push('/products')
        } else {
            history.push(`/products/search/${searchTerm}`)
        }
        setSearchTerm('')
    }

    //send user to login page if signin button on navbar pressed
    const handleSigninClick = (e) => {
        history.push('/login')
    }

    //logout the user
    const logoutUser = (e) => {
        dispatch(AuthAction.logout())
    }

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    return (
        <>
            <nav className='navbar-primary'>
                <img className='logo' onClick={handleImgClick} src={logo} alt='logo' />
                <div>
                    <form onSubmit={handleSearch}>
                        <input className='search-bar-nav' type='search' placeholder='Search Cadabra' onChange={e => setSearchTerm(e.target.value)} value={searchTerm}></input>
                    </form>
                </div>
                <div className='navbar-primary-links'>
                    <p>
                        Hello {currentUser.first_name ? <span style={{display: 'block'}}>{currentUser.first_name.charAt(0).toUpperCase() + currentUser.first_name.slice(1)}</span> : null}
                        {currentUser.id ? null : <span onClick={handleSigninClick}>Sign-In</span>}
                    </p>
                    <NavLink to="/products" activeclass="active">Explore</NavLink>
                    {currentUser.id ? null :  <NavLink to="/signup" activeclass="active">Signup</NavLink>}
                   
                    {currentUser.id ? <NavLink onClick={logoutUser} to='#' activeclass="active">Logout</NavLink> : null}

                </div>
            </nav>
            <nav className='navbar-secondary'>
                {
                    categories ?
                        Object.keys(categories).map((category, i) => {
                            return (
                                <div key={i} id={category} onClick={handleCategoryClick}>
                                    {category}
                                </div>
                            )
                        })
                        : null
                }
                <div key={1000} className='footer-nav'>
                    <a href='#footer'>About</a>
                </div>
            </nav>
        </>
    )
}

export default Navbar; 