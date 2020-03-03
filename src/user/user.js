import React, { Component } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import './chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SocketIOClient from 'socket.io-client';

class Users extends Component {

    constructor(props) {
        super(props);
        this.userMap = new Map();
        this.distinctUser = [];
        this.state = {
            open: false,
            socketEndpointUrl: process.env.REACT_APP_SOCIAL_APP_BASE_URL,
            onlineUsers: [],
            currentUserChattingWith: '',
            message: '',
            chats: {}
        };
        this.socket = SocketIOClient(this.state.socketEndpointUrl);

        this.socket.on('connection-received', () => {
            this.socket.emit('join', { username: window.localStorage.username, first_name: window.localStorage.first_name, last_name: window.localStorage.last_name });
        })

        this.socket.on('all-users', data => {
            this.distinctUser = [];
            const map = new Map();
            for (const item of data) {
                if (window.localStorage.getItem('username') !== item.username && !map.has(item.username)) {
                    map.set(item.username, true);
                    this.distinctUser.push({
                        username: item.username,
                        name: item.name
                    });

                    if (this.state.chats[this.state.currentUserChattingWith] === undefined) {
                        console.log("Setting chat empty array for user");
                        let newChats = Object.assign({}, this.state.chats, { [item.username]: [] });
                        this.setState({
                            chats: newChats
                        });
                    }
                }
            }
            this.setState({
                onlineUsers: this.distinctUser
            })
        });

        this.openOrCloseChat = this.openOrCloseChat.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.socket.on('private-message-received', data => {
            var elem = document.getElementById('bottomChatDiv');
            elem.scrollTop = elem.scrollHeight ;
            console.log("Private message " + JSON.stringify(data));
            if (data.toUsername !== window.localStorage.getItem('username') || data.fromUsername !== window.localStorage.getItem('username')) {
                const user = data.toUsername !== window.localStorage.getItem('username') ? data.toUsername : data.fromUsername;
                var userMessage = this.state.chats[user];
                userMessage = (userMessage === undefined) ? [] : userMessage;
                userMessage.push(data);
                let newChats = Object.assign({}, this.state.chats, { [user]: userMessage });
                this.setState({
                    chats: newChats
                });
                console.log("New chats " + JSON.stringify(this.state.chats));
            } else {
                console.log("Sender and receiver match current logged in user");
            }


        });
    }

    openOrCloseChat = (username) => {
        console.log("Opening chat for " + username);
        this.setState({
            currentUserChattingWith: username,
            open: !this.state.open
        });
    }

    sendMessage = () => {
        if (this.state.message === undefined || this.state.message === '') { return; }
        const messageObject = {
            message: this.state.message,
            fromUsername: window.localStorage.username,
            toUsername: this.state.currentUserChattingWith
        };

        this.socket.emit('private-message-sent', messageObject);
        this.setState({ message: '' });
    }

    handleInputChange = (e) => {
        this.setState({
            message: e.target.value
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
                            <div key={user.username} className='user-list-div' onClick={() => { this.openOrCloseChat(user.username) }} aria-controls="example-fade-text"
                                aria-expanded={this.state.open}>
                                {/* <img src='image/logo.png' height={30} width={30} className='user-chat-image' alt='ImageAbsent' /> */}
                                <span className='online-span'></span>
                                 {user.name}

                            </div>
                        )}
                    </Card.Body>
                </Card>
                <Collapse in={this.state.open} className='collapse-view'>
                    <div id="example-fade-text">
                        <div className="chat">
                            <div className="title">{this.state.currentUserChattingWith}</div>
                            <div className="bottomChatDiv text" id='bottomChatDiv'>
                                {this.state.currentUserChattingWith === '' ? null : this.state.chats[this.state.currentUserChattingWith].map(chat => <div style={{marginBottom:'5px !important'}} >
                                {window.localStorage.getItem('username') === chat.fromUsername ? <div className='col-12' style={{backgroundColor:'#e8e8e8', textAlign:'right',  borderRadius:'3px', display:'block', marginTop:'5px'}}>
                                    {chat.message}</div> : 
                                <div className='col-12' style={{backgroundColor:'#e8e8e8', textAlign:'left', borderRadius:'3px', display:'block', marginTop:'5px'}}>{chat.message}</div>}
                                </div>
                                )}
                            </div>
                            <div className="">
                                <div className="input-group mb-3">

                                    <input type='text' name="message" value={this.state.message} className="form-control " onChange={this.handleInputChange} placeholder="Type message here..." />
                                    <div className="input-group-append" onClick={this.sendMessage}>
                                        <span className="input-group-text ficon" ><FontAwesomeIcon icon={faArrowRight} color='white'  /></span>
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

export default Users;