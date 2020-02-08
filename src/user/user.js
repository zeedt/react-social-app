import React, { Component } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import './chat.css'
import { connect } from 'react-redux';
import ReduxThunkFunctions from '../redux/thunk-functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SocketIOClient from 'socket.io-client';

class Users extends Component {

    constructor(props) {
        super(props);
        this.userMap = new Map();
        this.distinctUser = [];
        props.loadUsers();
        this.state = {
            open: false,
            socketEndpointUrl: 'localhost:3001',
            onlineUsers: []
        };
        this.socket = SocketIOClient(this.state.socketEndpointUrl);

        this.socket.on('connection-received', () => {
            this.socket.emit('join', {username : window.localStorage.username, first_name : window.localStorage.first_name, last_name : window.localStorage.last_name});
        })

        this.socket.on('all-users', data => {
            console.log("as at " + new Date() + JSON.stringify(data));
            this.distinctUser = [];
            const map = new Map();
            for (const item of data) {
                console.log("iterating")
                if (!map.has(item.username)) {
                    console.log("Adding");
                    map.set(item.username, true);    // set any value to Map
                    this.distinctUser.push({
                        username: item.username,
                        name: item.name
                    });
                }
            }
            this.setState({
                onlineUsers: this.distinctUser
            })
        });

    }

    getDistinctUserFromOnlineUserSockets = () => {
        this.state.onlineUsers.map(user => {
            this.userMap.set(user.username, user.username);
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);