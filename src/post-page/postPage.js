import './postPage.css'
import React from 'react';


import { Card, Button } from 'react-bootstrap'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReduxThunkFunctions from '../redux/thunk-functions'
import PostItem from './post-item';
import debounce from 'lodash.debounce';
import Users from '../user/user';




class DefaultPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error : false,
            isLoading : false,
            hasMore : true,
            open : false,
        }
        window.onscroll = debounce(() => {
            
            const {
                state : { error,
                isLoading,
                hasMore },

            } = this;
            console.log("Loading posts " + props.loadingPosts);
            console.log(`bounce with isloading ${isLoading}, hasMore ${hasMore} and error ${error}`)
            if (error || props.loadingPosts || !hasMore) return;

            // Checks that the page has scrolled to the bottom
            if (
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            ) {
                if (props.loadingPosts){
                    console.log("Data already loading");
                    return;
                } 
                props.loadPosts();
            } else {
                console.log("nooooo")
            }

        }, 100);

    }

    loadPosts = () => {
        console.log("Called load posts method");
    }

    componentDidMount() {
        console.log("Component did mount");
    }

    componentWillMount() {
        this.props.loadPosts();
    }

    render() {
        return (

            <div className="col-md-12">

        
                <div className=" col-md-3 chatDiv mydivs">
                <Users />
            </div>
            <div className=" col-md-6 mydivs postDiv">

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

                {this.props.posts.map(post => <PostItem key={post.id} post={post} className='post' />)}

                {(this.props.loadingPosts) ? <div>Loading....</div> : null}

            </div>

            
            <div className=" col-md-3 mydivs">
                
            </div>

            </div>

            

        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        loadingPosts : state.loadingPosts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPosts: async () => {
            console.log('about to load posts');
            await dispatch(ReduxThunkFunctions.loadPosts());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DefaultPage));