import React, { Component } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import './chat.css'
import { connect } from 'react-redux';
import ReduxThunkFunctions from '../redux/thunk-functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SocketIOClient from 'socket.io-client';
import axios from 'axios';
const BASE_URL = 'http://localhost:3001/'

class Users extends Component {


    constructor(props) {
        super(props);
        props.loadUsers();
        this.state = {
            open: false,
            socketEndpointUrl: 'localhost:3001',
            onlineUsers : []
        };
        this.socket = SocketIOClient(this.state.socketEndpointUrl);
        this.socket.on('all-users', data => {
            console.log(JSON.stringify(data));
            this.setState({
                onlineUsers : data
            })
        })
    }

    componentDidMount() {
        axios
            .get(`${BASE_URL}my-info`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            }).then(res => {
                console.log('USER ' + JSON.stringify(res.data));
                const data = { username: res.data.username, name: (res.data.first_name + ' ' + res.data.last_name) };
                this.socket.emit('join', data);
                this.props.setCurrentUserInfo(data);
            });
    }

    render() {
        return (
            <div>
                <Card className='user-list-div'>
                    <Card.Header>
                        Available Users
            </Card.Header>
                    <Card.Body className='user-list-card-body'>
                        {this.state.onlineUsers.map(user =>
                            <div key={user.username} className='user-list-div' onClick={() => { this.setState({ open: !this.state.open }) }} aria-controls="example-fade-text"
                                aria-expanded={this.state.open}>
                                <img src='image/logo.png' height={30} width={30} className='user-chat-image' alt='ImageAbsent' /> {user.name}

                            </div>
                        )}
                    </Card.Body>
                </Card>
                <Collapse in={this.state.open} className='collapse-view'>
                    <div id="example-fade-text">
                        <div className="chat">
                            <div className="title">This is the chat title</div>
                            <div className="bottomChatDiv text">
                                <p>Text 1</p>
                                <p>Text 2</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                                <p>Text 3</p>
                            </div>
                            <div className="">
                                <div className="input-group mb-3">

                                    <input type='text' name="message" className="form-control " onChange={this.handleInputChange} placeholder="Type message here..." />
                                    <div className="input-group-append">
                                        <span className="input-group-text ficon" ><FontAwesomeIcon icon={faArrowRight} color='white' /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        users: state.users,
        myInfo: state.loggedInUserInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUsers: async () => {
            await dispatch(ReduxThunkFunctions.loadUsers());
        },
        loadCurrentUserInfo: async (userData) => {
            dispatch(ReduxThunkFunctions.loadCurrentUserInfo());
        },
        setCurrentUserInfo: async (userData) => {
            dispatch({ type: 'SET_CURRENT_USER', data: userData });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);