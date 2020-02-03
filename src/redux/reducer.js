import loadPosts from '../post-page/postPageService';
import ReducerActions from './reducer-action'

const reducer =  (state={posts : [], currentPostId : null, comments : [], loadingPosts : false, lastId : 0 }, action) => {
    console.log(action.type)
    switch(action.type) {
        case ("RECEIVE_POSTS"):
            if (action.data.length > 0) {
                return Object.assign({}, state, {posts:state.posts.concat(action.data), lastId : action.data[(action.data.length -1)].id, loadingPosts : false});
            }
            return Object.assign({}, state, {posts:state.posts.concat(action.data), loadingPosts : false});
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