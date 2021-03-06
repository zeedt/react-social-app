import React from 'react';
import './signup.css'
import '../bootstrap/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import LoginService from '../login/login.service';
import {Link} from 'react-router-dom';
import {Button, Spinner} from 'react-bootstrap';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            first_name: '',
            last_name: '',
            gender: '',
            email: '',
            loading : false,
            signUpResponse : {successful : false, message:''}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    signup = async (e) => {
        console.dir(this.state);
        this.setState({
            loading: true
        });
        const response = await LoginService.signUp(this.state);
        console.dir(response);
        if (response.successful) {
            this.setState({signUpResponse:{successful : true, message : 'Login successful'}});
            this.setState({
                username: '',
                password: '',
                password2: '',
                first_name: '',
                last_name: '',
                gender: '',
                email: '',
            });
        } else {
            this.setState({signUpResponse:{successful : false, message : response.message}})
        }
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <div className='wrapper'>
                <div className='signup-container justify-content-center'>
                    <div className="brand_logo_container">
                        <img src="/image/app-logo-image.png" className="brand_logo" alt="Logo" />
                    </div>
                    <div className='signup-box'>
                        <div className=''>
                            <form className='col-10 offset-1 signupForm' >
                                <div className='errorDiv'>
                                    {this.state.signUpResponse.message}
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text ficon"><FontAwesomeIcon icon={faUser} color='white' /></span>
                                    </div>
                                    <input type="text" name="username" className="form-control input_user" value={this.state.username} placeholder="username" onChange={this.handleInputChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text ficon"><FontAwesomeIcon icon={faUser} color='white' /></span>
                                    </div>
                                    <input type="text" name="first_name" className="form-control input_user" value={this.state.first_name} placeholder="First name" onChange={this.handleInputChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text ficon"><FontAwesomeIcon icon={faUser} color='white' /></span>
                                    </div>
                                    <input type="text" name="last_name" className="form-control input_user" placeholder="Last name" value={this.state.last_name} onChange={this.handleInputChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text ficon"><FontAwesomeIcon icon={faEnvelope} color='white' /></span>
                                    </div>
                                    <input type="email" name="email" className="form-control input_user" placeholder="Email address" value={this.state.email} onChange={this.handleInputChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text ficon"><FontAwesomeIcon icon={faUser} color='white' /></span>
                                    </div>
                                    <select name="gender" className="form-control input_user" value={this.state.gender} onChange={this.handleInputChange}>
                                        <option value=''> -- Select gender -- </option>
                                        <option value='MALE'> MALE </option>
                                        <option value='FEMALE'>FEMALE</option>
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text ficon" ><FontAwesomeIcon icon={faKey} color='white' /></span>
                                    </div>
                                    <input type='password' name="password" className="form-control input_user" value={this.state.password} onChange={this.handleInputChange} placeholder="password" />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text ficon" ><FontAwesomeIcon icon={faKey} color='white' /></span>
                                    </div>
                                    <input type='password' name="password2" className="form-control input_user" value={this.state.password2} onChange={this.handleInputChange} placeholder="Confirm password" />
                                </div>
                                <div className="input-group">
                                    <Button onClick={this.signup} className='form-control btn btn-danger md-col-12 pull-right signUpButton'>
                                    {this.state.loading ? <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> : null}
                                        {this.state.loading ? <span>Registering user...</span> : <span>SignUp</span>}
                                    </Button>
                                    {/* <input type="submit" value='SignUp' className='form-control btn btn-danger md-col-12 pull-right signUpButton' /> */}
                                </div>
                            </form>
                            <div className='userHelpDiv'>
                                Already have an account? <Link to="/login">Sign In</Link> <p></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;