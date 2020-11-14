import React from 'react';
import { Switch, Route, NavLink, withRouter } from 'react-router-dom';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetails';
import Products from './components/Products';
import UserList from './components/UsersList';
import LoginForm from './forms/Login';
import SignupForm from './forms/Signup';


const App = (props) => {
    return (
        <>
            {/* no navbar on login or sign up page */}
            { props.location.pathname != '/login' && props.location.pathname != '/signup' ?
                <Navbar/>
                :
                null
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
