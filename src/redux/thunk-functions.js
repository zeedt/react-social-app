import axios from 'axios';
import store from './store';
import ReducerActions from './reducer-action';
const BASE_URL = process.env.REACT_APP_SOCIAL_APP_BASE_URL;
const pageSize = 10;

const getHeader = () => {
    return {Authorization : 'Bearer ' + localStorage.getItem('access_token')}
}

const checkErrorAndRedirectIfNecessary = (error) => {
    console.error(error)
    try{
        if (error.response.status == 401) {
            localStorage.removeItem('access_token');
            window.location.replace('/login');
        }
    } catch(error) {
        console.error(error)
        console.log("Error occurred during redirection");
        window.location.replace('/login');
    }
    
}
const ReduxThunkFunctions = {

    loadPosts : (pageNo=0) => {
        store.dispatch({type: "SET_ABOUT_TO_LOAD_POST_TRUE"});
        return  (dispatch, getState) => {
            try {
                const currentState = getState();
                var url = `${BASE_URL}posts/?pageNo=${pageNo}&pageSize=${pageSize}`;
                if (currentState.lastId > 0){
                     url = `${BASE_URL}posts-with-lesser-id/?id=${currentState.lastId}&pageSize=${pageSize}`;
                }
                axios
                .get(url, {
                    headers : getHeader()
                }).then(res=> {
                    dispatch({type : "RECEIVE_POSTS", data:res.data})
                }).catch((error, data)=> {
                    console.log(error)
                    checkErrorAndRedirectIfNecessary(error);
                    dispatch({type: ReducerActions.DONE_LOADING_POSTS})
                });
            } catch (e) {
                console.dir(e);
                dispatch({type: ReducerActions.DONE_LOADING_POSTS})
            }
        }
        
    },

    loadUsers : ()=> {
        store.dispatch({type: "LOADING_USERS"});
        return (dispatch, getState) => {
            axios
            .get(`${BASE_URL}load-users`, {
                headers : getHeader()
            })
            .then(res => {
                dispatch({type:'RECEIVE_USERS', data : res.data.users});
                dispatch({type: "DONE_LOADING_USERS"});

            })
            .catch(err => {
                console.error(err);
                checkErrorAndRedirectIfNecessary(err);
                dispatch({type: "DONE_LOADING_USERS"});
            });
        }
        
    },

    loadCurrentUserInfo : () => {
        return (dispatch, getState) => {
            try {
                axios
                .get(`${BASE_URL}my-info`, {
                    headers : {Authorization : `Bearer ${localStorage.getItem('access_token')}`}
                }).then(res=> {
                    dispatch({type:'SET_CURRENT_USER', data : res.data});
                }).catch(err => {
                    console.log("Error occurred due to ", err);
                    checkErrorAndRedirectIfNecessary(err);
                });
            } catch(error) {

            }
        }
    }

}


export default ReduxThunkFunctions;