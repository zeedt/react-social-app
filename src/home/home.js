import './home.css'
import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import DefaultPage from '../default-page/DefaultPage';
import AppNavbar from '../navbar/navbar';
import Login from '../login/login'
import Signup from '../signup/signup';
import UserInfo from '../user-info/user-info';
import UserProfile from  '../user-profile/user-profile';



class Home extends React.Component {

    render() {
        return (

            <div className='home-container-super'>

                <BrowserRouter>
                <AppNavbar loadLogin={this.props.loadLogin}/>
                            <Switch>
                            <Route exact path='/' component={DefaultPage} />
                            <Route path='/login' component={Login} />
                            <Route path='/signup' component={Signup} /> 
                            <Route path='/info' component={UserInfo} />
                            <Route path='/profile/:username' component={UserProfile} />
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