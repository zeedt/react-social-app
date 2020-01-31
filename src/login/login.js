import React from 'react';
import './login.css'
import '../bootstrap/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import LoginService from './login.service';
import { Link, withRouter } from 'react-router-dom'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentWillMount() {
        if (localStorage.getItem('access_token') != null) {
            this.props.history.push('/')
        }
    }

    login = async (e) => {
        e.preventDefault();
        console.dir(this.state);
        const response = await LoginService.login(this.state);
        if (response.access_token) {
            window.localStorage.setItem('access_token', response.access_token);
            this.props.history.push('/home')
        } else {
            alert(response.message);
        }
    }

    render() {
        return (
            <div className='wrapper'>
                <div className='login-container justify-content-center'>
                    <div className="brand_logo_container">
                        <img src="https://cdn.freebiesupply.com/logos/large/2x/pinterest-circle-logo-png-transparent.png" className="brand_logo" alt="Logo" />
                    </div>
                    <div className='login-box'>
                        <div className=''>
                            <form className='col-10 offset-1 loginForm' onSubmit={this.login}>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text ficon"><FontAwesomeIcon icon={faUser} color='white' /></span>
                                    </div>
                                    <input type="text" name="username" className="form-control input_user" placeholder="username" onChange={this.handleInputChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text ficon" ><FontAwesomeIcon icon={faKey} color='white' /></span>
                                    </div>
                                    <input type='password' name="password" className="form-control input_user" onChange={this.handleInputChange} placeholder="password" />
                                </div>

                                <div className="input-group">
                                    <input type="submit" value='Login' className='form-control btn btn-danger md-col-12 pull-right loginButton' />
                                </div>
                            </form>
                            <div className='userHelpDiv'>
                                Don't have an account? <Link to="/signup">Sign Up</Link> <p></p>
                                <Link to='/signup'>Forgot your password?</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);