import React from 'react';
import './login.css'
import '../bootstrap/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import LoginService from './login.service';
import { Link, withRouter } from 'react-router-dom'
import { Button, Spinner } from 'react-bootstrap';
import store from '../redux/store';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            errorMessage : '',
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
        this.setState({
            loading: true
        });
        e.preventDefault();
        console.dir(this.state);
        const response = await LoginService.login(this.state);
        if (response.access_token && response.access_token.token_string) {
            window.localStorage.setItem('access_token', response.access_token.token_string);
            window.localStorage.setItem('username', response.access_token.user.username);
            window.localStorage.setItem('first_name', response.access_token.user.first_name);
            window.localStorage.setItem('last_name', response.access_token.user.last_name);
            window.localStorage.setItem('email', response.access_token.user.email);
            window.localStorage.setItem('display_picture', response.access_token.user.display_picture);
            window.localStorage.setItem('gender', response.access_token.user.gender);
            // store.dispatch({type:'SET_CURRENT_USER', data : response.access_token.user});
            // this.props.history.push('/home')
            window.location.href = '/'
        } else {
            this.setState(({
                errorMessage : response.message
            }));
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div className='wrapper'>
                <div className='login-container justify-content-center'>
                    <div className="brand_logo_container">
                        <img src="/image/app-logo-image.png" className="brand_logo" alt="Logo" />
                    </div>
                    <div className='login-box'>
                        <div className=''>
                            <form className='col-10 offset-1 loginForm' onSubmit={this.login}>
                                <div className="input-group mb-3">

                                    <div className='errorDiv col-12'>{this.state.errorMessage}</div>

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
                                    <Button variant="primary" className='form-control btn btn-danger md-col-12 pull-right loginButton' disabled={this.state.loading} onClick={this.login}>
                                        {this.state.loading ? <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> : null}
                                        {this.state.loading ? <span>Signing in...</span> : <span>Login</span>}
                                    </Button>
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