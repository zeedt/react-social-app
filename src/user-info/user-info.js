import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import './user-info.css';
import { Card, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const BASE_URL = 'http://localhost:3001/'

class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            gender: '',
            display_picture: '',
            newPassword1: '..........',
            newPassword2: '......',
            currentPassword: '..............',
            successfulMessage: '',
            errorMessage: '',
            loading : false

        };
        this.getCurrentUserInfo();
    }

    getCurrentUserInfo = () => {
        axios
            .get(`${BASE_URL}my-info`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } })
            .then(res => this.mapUserInfoToState(res.data))
            .catch(err => console.error(err));
    }

    mapUserInfoToState = (data) => {
        const { username, first_name, last_name, gender, email, display_picture } = data;
        this.setState(() => {
            return {
                username, first_name, last_name, gender, email, display_picture
            }
        }, () => console.log("====>"));
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateUserInformation = () => {
        if (this.state.loading){return;}
        this.setState({
            successfulMessage: '',
            errorMessage: '',
            loading : true
        });
        const { email, password, first_name, last_name } = this.state;
        axios
            .post(`${BASE_URL}update-my-info`, { email, password, first_name, last_name }, {
                headers:
                    { Authorization: 'Bearer ' + localStorage.getItem('access_token') }
            })
            .then(res => {
                const { data } = res;
                const { message } = data;
                console.log(message)
                this.setState({ successfulMessage: message, loading : false });
            })
            .catch(err => {
                console.error(err);
                const { response } = err;
                console.dir(response);
                const { status, data } = response;
                if (status === 401) {
                    localStorage.removeItem('access_token');
                    window.location.replace('/login');
                }
                this.setState({ errorMessage: data.message, loading : false })
            });
    }

    updateUserPassword = () => {
        if (this.state.loading){return;}
        this.setState({
            successfulMessage: '',
            errorMessage: '',
            loading : true
        });
        const { currentPassword, newPassword1 } = this.state;
        axios
            .post(`${BASE_URL}update-password`, { currentPassword, newPassword : newPassword1 }, {
                headers:
                    { Authorization: 'Bearer ' + localStorage.getItem('access_token') }
            })
            .then(res => {
                const { data } = res;
                const { message } = data;
                console.log(message)
                this.setState({ successfulMessage: message, loading : false });
            })
            .catch(err => {
                console.error(err);
                const { response } = err;
                console.dir(response);
                const { status, data } = response;
                if (status === 401) {
                    localStorage.removeItem('access_token');
                    window.location.replace('/login');
                }
                this.setState({ errorMessage: data.message, loading : false })
            });
    }
    render() {
        return (
            <div className='col-md-6 offset-md-3 user-info-container'>

                <Card>
                    <Card.Header>User Information</Card.Header>
                    <Card.Body>
                        Edit your information below
                       <form className='' >
                            <div className='errorDiv'>
                                {this.state.errorMessage}
                            </div>
                            <div className='successDiv'>
                                {this.state.successfulMessage}
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span className="input-group-text ficon"><FontAwesomeIcon icon={faUser} color='white' /></span>
                                </div>
                                <input type="text" name="username" disabled className="form-control input_user" value={this.state.username} placeholder="username" onChange={this.handleInputChange} />
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
                                <select name="gender" disabled className="form-control input_user" value={this.state.gender} onChange={this.handleInputChange}>
                                    <option value=''> -- Select gender -- </option>
                                    <option value='MALE'> MALE </option>
                                    <option value='FEMALE'>FEMALE</option>
                                </select>
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span className="input-group-text ficon" ><FontAwesomeIcon icon={faKey} color='white' /></span>
                                </div>
                                <input type='password' name="password" className="form-control input_user" value={this.state.password} onChange={this.handleInputChange} placeholder="Current password" />
                            </div>

                            <div className="input-group">
                                <Button onClick={this.updateUserInformation} className='form-control btn btn-danger md-col-12 pull-right signUpButton'>
                                    {this.state.loading ? <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> : null}
                                    {this.state.loading ? <span>Updating user information...</span> : <span>Update your information</span>}
                                </Button>
                                {/* <input type="submit" value='SignUp' className='form-control btn btn-danger md-col-12 pull-right signUpButton' /> */}
                            </div>

                        </form>
                        <p />
                        <div>Update Password</div><p />
                        <div className="input-group mb-3">
                            <div className="input-group-append">
                                <span className="input-group-text ficon" ><FontAwesomeIcon icon={faKey} color='white' /></span>
                            </div>
                            <input type='password' name="currentPassword" className="form-control input_user" value={this.state.currentPassword} onChange={this.handleInputChange} placeholder="Current password" />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-append">
                                <span className="input-group-text ficon" ><FontAwesomeIcon icon={faKey} color='white' /></span>
                            </div>
                            <input type='password' name="newPassword1" className="form-control input_user" value={this.state.newPassword1} onChange={this.handleInputChange} placeholder="New password" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-append">
                                <span className="input-group-text ficon" ><FontAwesomeIcon icon={faKey} color='white' /></span>
                            </div>
                            <input type='password' name="newPassword2" className="form-control input_user" value={this.state.newPassword2} onChange={this.handleInputChange} placeholder="Confirm new password" />
                        </div>
                        <div className="input-group">
                            <Button onClick={this.updateUserPassword} className='form-control btn btn-danger md-col-12 pull-right signUpButton'>
                                {this.state.loading ? <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : null}
                                {this.state.loading ? <span>Updating user's password ...</span> : <span>Update Password</span>}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}



export default withRouter(UserInfo);