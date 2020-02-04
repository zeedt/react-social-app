import React, {Component} from 'react';
import { Card } from 'react-bootstrap';
import './chat.css'
import { connect } from 'react-redux';
import ReduxThunkFunctions from '../redux/thunk-functions';

class Users extends Component {


constructor(props) {
    super(props);
    props.loadUsers();
    
}

render(){
    return(
        <Card>
            <Card.Header>
                Available Users
            </Card.Header>
            <Card.Body className='user-list-card-body'>
                {this.props.users.map( user => 
                    <div key={user.username} className='user-list-div'>
                        <img src='image/logo.png' height={30} width={30} className='user-chat-image' /> {user.first_name} {user.last_name}
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}

}

const mapStateToProps = state => {
    return {
        users : state.users
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUsers : async () => {
            await dispatch(ReduxThunkFunctions.loadUsers());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);