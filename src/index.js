import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as ReactRedux from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import Home from './home/home';
import 'bootstrap/dist/css/bootstrap.min.css';

const loadLogin = (window.localStorage.getItem('access_token') == null) ? true : false;

ReactDOM.render(
<ReactRedux.Provider store={store}>
    <Home loadLogin={loadLogin}/>
</ReactRedux.Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
