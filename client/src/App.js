import React from 'react';
import { Switch, Route, NavLink, withRouter } from 'react-router-dom';
import Homepage from './components/Homepage';
import ProductDetail from './components/ProductDetails';
import Products from './components/Products';
import UserList from './components/UsersList';
import LoginForm from './forms/Login';
import SignupForm from './forms/Signup';
import logo from './images/Cadabra2.png'


const App = (props) => {
    const handleImgClick = () => {
        props.history.push('/')
    }
    return (
        <>
            { props.location.pathname != '/login' ?
                <nav className='navbar'>
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
                :
                <nav className='navbar'>
                    <div>
                        <NavLink to="/products" activeclass="active">Explore</NavLink>
                        <NavLink to="/signup" activeclass="active">Signup</NavLink>
                    </div>
                </nav>
            }

            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>

                <Route path="/login">
                    <LoginForm />
                </Route>

                <Route path="/signup">
                    <SignupForm />
                </Route>

                <Route path="/products/:id" render={(match) => (
                    <ProductDetail {...match} />
                )}>
                </Route>

                <Route path="/products">
                    <Products />
                </Route>

                <Route path="/" render={props => <Homepage {...props} />}></Route>

            </Switch>
        </>
    );
}

export default withRouter(App);
