import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import UserList from './components/UsersList';
import LoginForm from './forms/Login';
import SignupForm from './forms/Signup';


const App = () => {


    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>

                <Route path="/">
                    <h1>My Home Page</h1>
                </Route>
            </Switch>
            <LoginForm/>
            <SignupForm/>
        </BrowserRouter>
    );
}

export default App;
