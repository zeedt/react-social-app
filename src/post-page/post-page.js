import './post-page.css';
import React from 'react';
import PostPageService from './postPageService';
import { Card, Button, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux';
import ReduxThunkFunctions from '../redux/thunk-functions'
import PostItem from './post-item';
import debounce from 'lodash.debounce';
import axios from 'axios';




class PostPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoading: false,
            hasMore: true,
            open: false,
            postContent: '',
            myProfilePicture: '',
            posting: false
        }
        this.loadUserInfo();
        
        let userAgentString =  navigator.userAgent; 
        this.chromeAgent = userAgentString.indexOf("Chrome") > -1;
        this.safariAgent =  userAgentString.indexOf("Safari") > -1; 
        window.onscroll = debounce(() => {

            const {
                state: { error,
                    isLoading,
                    hasMore },

            } = this;
            console.log("Loading posts " + props.loadingPosts);
            if (error || props.loadingPosts || !hasMore) return;
            // Checks that the page has scrolled to the bottom
            // window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            if (
                (document.documentElement.offsetHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight && this.safariAgent) ||
                (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight )
            ) {
                if (props.loadingPosts) {
                    console.log("Data already loading");
                    return;
                }
                props.loadPosts();
            } else {}

        }, 100);

        this.submitPost = this.submitPost.bind(this);
        this.handlePostContentChange = this.handlePostContentChange.bind(this);

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

    submitPost = async () => {
        this.setState({
            posting: true
        });
        const result = await PostPageService.addPosts(this.state.postContent);
        if (result) {
            await this.props.prependNewPost({ content: result.data.content, id: result.data.id, createdAt: result.data.createdAt, user: { first_name: window.localStorage.first_name, last_name: window.localStorage.last_name, display_picture : this.state.myProfilePicture } });
            this.setState({
                posting: false,
                postContent: ''
            });
        }
    }

    loadUserInfo = () => {
        axios
            .get(`${process.env.REACT_APP_SOCIAL_APP_BASE_URL}my-info`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } })
            .then(res => {
                if (res.data.display_picture !== undefined && res.data.display_picture !== null) {
                    this.setState({ myProfilePicture: res.data.display_picture });
                }
            })
            .catch(err => console.error(err));
    }

    handlePostContentChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getPictureOrAlternatePicture = () => {
        return (this.state.myProfilePicture === '' || this.state.myProfilePicture === undefined) ? 'image/no-image.png' : this.state.myProfilePicture;
    }
    render() {
        return (

            <div className="col-md-12">

                <Card className='add-post-card'>
                    <Card.Header className='add-post-card-header'>Create post</Card.Header>
                    <Card.Body className='add-post-card-body'>
                        <div className="input-group mb-3">
                            <div className="input-group-append">
                                <img src={this.getPictureOrAlternatePicture()} height={50} width={50} className='user-image' />
                            </div>
                            <textarea name="postContent" className="form-control input_user" value={this.state.postContent} onChange={this.handlePostContentChange} placeholder="Write a post here...." />
                        </div>
                        <Button className='post-submit-button' onClick={this.submitPost} disabled={this.state.posting} >
                            {this.state.posting ? <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> : null}
                            {this.state.posting ? <span>Posting...</span> : <span>Submit</span>}

                        </Button>
                    </Card.Body>
                </Card>

                {this.props.posts.map(post => <PostItem key={post.id} post={post} className='post' />)}

                {(this.props.loadingPosts) ? <div>Loading....</div> : null}

            </div>



        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        loadingPosts: state.loadingPosts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPosts: async () => {
            console.log('about to load posts');
            await dispatch(ReduxThunkFunctions.loadPosts());
        },
        resetLastIdFetched: () => {
            dispatch({ type: 'RESET_LAST_ID' });
        },
        prependNewPost: (post) => {
            dispatch({ type: 'PREPEND_POST_FROM_LOGGED_IN_USER', data: post })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)((PostPage));