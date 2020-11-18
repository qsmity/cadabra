import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetails';
import Products from './components/Products';
import SearchResults from './components/SearchResultsPage';
import LoginForm from './forms/Login';
import SignupForm from './forms/Signup';


const App = (props) => {
    return (
        <>
            {/* no navbar on login or sign up page */}
            { props.location.pathname !== '/login' && props.location.pathname !== '/signup' ?
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

                {/* route for filtered results */}
                <Route path="/products/filtered/:category" component={Products}>
                </Route>

                <Route exact path="/products/:id" render={(match) => (
                    <ProductDetail {...match} />
                )}>
                </Route>


                <Route exact path="/products/search/:term" component={SearchResults}>
                </Route>

                <Route exact path="/products" component={Products}>
                </Route>


                <Route path="/" render={props => <Homepage {...props} />}></Route>


            </Switch>
        </>
    );
}

// using withRouter wrapper to have App comp to have access to location property for navbar hidden logic
export default withRouter(App);
