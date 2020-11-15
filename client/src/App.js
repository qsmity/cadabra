import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetails';
import Products from './components/Products';
import LoginForm from './forms/Login';
import SignupForm from './forms/Signup';


const App = (props) => {
    return (
        <>
            {/* no navbar on login or sign up page */}
            { props.location.pathname != '/login' && props.location.pathname != '/signup' ?
                <Navbar />
                :
                null
            }

            <Switch>
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

// using withRouter wrapper to have App comp to have access to location property for navbar hidden logic
export default withRouter(App);
