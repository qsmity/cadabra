import React,  {useEffect } from 'react';
import logo from '../images/Cadabra2.png'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategories} from '../reducers/categories'
import { useHistory } from 'react-router-dom'



const Navbar = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const categories = useSelector( state => state.categories)

    const handleImgClick = () => {
        history.push('/')
    }

    useEffect( () => {
        dispatch(getAllCategories())
    }, [])

    console.log('navbar cat', categories)
    return (
        <>
            <nav className='navbar-primary'>
                <img className='logo' onClick={handleImgClick} src={logo} alt='logo' />
                <div>
                    <input className='search-bar-nav' type='search' placeholder='Search Cadabra'></input>
                </div>
                <div>
                    <NavLink to="/products" activeclass="active">Explore</NavLink>
                    <NavLink to="/login" activeclass="active">Login</NavLink>
                    <NavLink to="/signup" activeclass="active">Signup</NavLink>
                    <NavLink to="/logout" activeclass="active">Logout</NavLink>
                </div>
            </nav>
            <nav className='navbar-secondary'>
                {
                    categories ? 
                    Object.keys(categories).map( (category, i) => {
                        return(
                            <div key={i}>
                                {category}
                            </div>
                        )
                    })
                    : null
                }
            </nav>
        </>
    )
}

export default Navbar; 