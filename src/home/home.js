import './home.css'
import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import DefaultPage from '../post-page/postPage';
import AppNavbar from '../navbar/navbar';
import Login from '../login/login'
import Signup from '../signup/signup';




class Home extends React.Component {

    render() {
        return (

            <div className='home-container-super'>

                <BrowserRouter>
                <AppNavbar loadLogin={this.props.loadLogin}/>
                            <Switch>
                            <Route exact path='/' component={DefaultPage} />
                            <Route exact path='/page1' component={AppNavbar} />
                            <Route path='/login' component={Login} />
                            <Route path='/signup' component={Signup} /> 
                            <Route component={DefaultPage} />
                            </Switch>
                </BrowserRouter>

                <div className='content'>

                </div>

            </div>




        )
    }
}


export default Home;