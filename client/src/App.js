import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import ProductDetail from './components/ProductDetails';
import Products from './components/Products';
import UserList from './components/UsersList';
import LoginForm from './forms/Login';
import SignupForm from './forms/Signup';


const App = () => {


    return (
        <BrowserRouter>
            <nav className='navbar'>
                <div>
                    <NavLink to="/" activeclass="active">Home</NavLink>
                    <NavLink to="/users" activeclass="active">Users</NavLink>
                </div>
                <div>
                    <input className='search-bar-nav' type='search' placeholder='Search Cadabra'></input>
                </div>
                <div>
                    <NavLink to="/login" activeclass="active">Login</NavLink>
                    <NavLink to="/signup" activeclass="active">Signup</NavLink>
                </div>
            </nav>
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
                    <ProductDetail {...match}/>
                )}>
                </Route>

                <Route path="/">
                    <Products />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
