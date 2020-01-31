import axios from 'axios';
import store from './store';
import ReducerActions from './reducer-action';
const POST_URL = 'http://localhost:3001/posts';

const ReduxThunkFunctions = {

    loadPosts : () => {
        console.log("Here");
        store.dispatch({type: "SET_ABOUT_TO_LOAD_POST_TRUE"});
        return  (dispatch, getState) => {
            try {
                axios
                .get(POST_URL, {
                    headers : {Authorization : 'Bearer ' + localStorage.getItem('access_token')}
                }).then(res=> {
                    console.dir(res);
                    dispatch({type : "RECEIVE_POSTS", data:res.data})
                });
          
            //   console.dir(responseData);
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