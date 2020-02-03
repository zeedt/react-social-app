import axios from 'axios';
import store from './store';
import ReducerActions from './reducer-action';
const BASE_URL = 'http://localhost:3001/';
const pageSize = 10;

const ReduxThunkFunctions = {

    loadPosts : (pageNo=0) => {
        console.log("Here");
        store.dispatch({type: "SET_ABOUT_TO_LOAD_POST_TRUE"});
        return  (dispatch, getState) => {
            try {
                const currentState = getState();
                var url = `${BASE_URL}posts/?pageNo=${pageNo}&pageSize=${pageSize}`;
                if (currentState.lastId > 0){
                     url = `${BASE_URL}posts-with-lesser-id/?id=${currentState.lastId}&pageSize=${pageSize}`;
                }
                console.dir(getState())
                const responseData =  axios
                .get(url, {
                    headers : {Authorization : 'Bearer ' + localStorage.getItem('access_token')}
                }).then(res=> {
                    console.dir(responseData);
                    dispatch({type : "RECEIVE_POSTS", data:res.data})
                }).catch((error, data)=> {
                    if (error.response.status == 401) {
                        localStorage.removeItem('access_token');
                        window.location.replace('/login');
                    }
                    dispatch({type: ReducerActions.DONE_LOADING_POSTS})
                });
            } catch (e) {
                console.dir(e.response);
                if (e.response.status == 401) {
                    localStorage.removeItem('access_token');
                    window.location.replace('/login');
                }
                dispatch({type: ReducerActions.DONE_LOADING_POSTS})
            }
        }
        
    }


}


export default ReduxThunkFunctions;