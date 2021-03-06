const stateInitial = {
    posts: [],
    currentPostId: null,
    comments: [],
    loadingPosts: false,
    lastId: 0,
    loadingUsers: false,
    users: [],
    loggedInUserInfo: {}
}

const reducer = (state = stateInitial, action) => {
    console.log(action.type)
    switch (action.type) {
        case ("RECEIVE_POSTS"):
            if (action.data.length > 0) {
                return Object.assign({}, state, { posts: state.posts.concat(action.data), lastId: action.data[(action.data.length - 1)].id, loadingPosts: false });
            }
            return Object.assign({}, state, { posts: state.posts.concat(action.data), loadingPosts: false });
        case ("SET_ABOUT_TO_LOAD_POST_TRUE"):
            console.log('updating loading post status to true');
            return Object.assign({}, state, { loadingPosts: true });
        case ("DONE_LOADING_POSTS"):
            console.log('updating loading post status to false');
            return Object.assign({}, state, { loadingPosts: false });
        case ("DONE_LOADING_USERS"):
            console.log('Done loading users');
            return Object.assign({}, state, { loadingUsers: false });
        case ("LOADING_USERS"):
            console.log('Loading users');
            return Object.assign({}, state, { loadingUsers: true });
        case 'RECEIVE_USERS':
            return Object.assign({}, state, { loadingUsers: false, users: action.data });
        case 'SET_CURRENT_USER':
            console.log("SETTING CURRENT USER " + JSON.stringify(action.data));
            return Object.assign({}, state, { loggedInUserInfo: action.data });
        case 'RESET_LAST_ID':
            return Object.assign({}, state, {lastId: 0});
        case 'PREPEND_POST_FROM_LOGGED_IN_USER':
            var currentPosts = state.posts;
            currentPosts.unshift(action.data);
            return Object.assign({}, state, {posts: currentPosts});
        default:
            console.log("In default")
            return state
    }

}

export default reducer;