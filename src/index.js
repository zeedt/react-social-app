import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as ReactRedux from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter} from 'react-router-dom';
import store from './redux/store';
import Login from './login/login';
import Signup from './signup/signup';
import Home from './home/home';

ReactDOM.render(
<BrowserRouter>
<ReactRedux.Provider store={store}>
    <React.Fragment>
        <Route exact path='/' component={App} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/home' component={Home} />
    </React.Fragment>
</ReactRedux.Provider>
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
