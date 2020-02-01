import './postPage.css'
import React from 'react';


import { Card,  Button } from 'react-bootstrap'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReduxThunkFunctions from '../redux/thunk-functions'
import PostItem from './post-item';



class DefaultPage extends React.Component {

    constructor(props) {
        super(props);
        console.log("Called");
        
    }

    componentDidMount() {
        console.log("Component will mount");
    }

componentWillMount() {
    this.props.loadPosts();
}




    render(){
        return (
            
            <div className="container col-md-6">

                <Card className='add-post-card'>
                    <Card.Header className='add-post-card-header'>Create post</Card.Header>
                    <Card.Body className='add-post-card-body'>
                        <div className="input-group mb-3">
                            <div className="input-group-append">
                                <img src='https://cdn.freebiesupply.com/logos/large/2x/pinterest-circle-logo-png-transparent.png' height={50} width={50} alt='Nothing' className='user-image' />
                            </div>
                            <textarea name="post" className="form-control input_user" placeholder="Write a post here...." />
                        </div>
                        <Button className='post-submit-button'  >Submit</Button>
                    </Card.Body>
                </Card>

                {this.props.posts.map(post=><PostItem key={post} post={post} className ='post' />)}
            </div>

    )
}
}

const mapStateToProps = state => {
    return {
        posts : state.posts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPosts : () => {
            console.log('about to load posts');
            dispatch(ReduxThunkFunctions.loadPosts());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DefaultPage));