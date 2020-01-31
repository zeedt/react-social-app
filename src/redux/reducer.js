import loadPosts from '../default/postPageService';
import ReducerActions from './reducer-action'

const reducer =  (state={posts : [], currentPostId : null, comments : [], loadingPosts : false, }, action) => {
    console.log(action.type)
    console.log("Posts " + state.posts)
    switch(action.type) {
        case ("RECEIVE_POSTS"):
            return Object.assign({}, state, {posts:state.posts.concat(action.data)});
        case ("SET_ABOUT_TO_LOAD_POST_TRUE"):
            console.log('updating loading post status to true');
            return Object.assign({}, state, {loadingPosts : true});
        case ("DONE_LOADING_POSTS"):
            console.log('updating loading post status to false');
            return Object.assign({}, state, {loadingPosts : false});
        default:
            console.log("In default")
            return state
    }

}

export default reducer;