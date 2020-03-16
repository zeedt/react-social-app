import axios from 'axios';
const BASE_URL = process.env.REACT_APP_SOCIAL_APP_BASE_URL;

const UserService = {

    getMyLoggedInUserInfo : async () => {
        try {
            axios
            .get(`${BASE_URL}my-info`, {
                headers : {Authorization : `Bearer ${localStorage.getItem('access_token')}`}
            }).then(res=> {
                console.dir(res.data)
                return res.data;
            }).catch(err => {
                console.log("Error occurred due to ", err);
                if (err.response.status == 401) {
                    localStorage.removeItem('access_token');
                    window.location.replace('/login');
                }
            });
        } catch(e) {
            console.log("Error occurred due to ", e);
        }
        
    },

    logout : () => {
        axios
          .get(`${BASE_URL}logout`, {headers : {Authorization : `Bearer ${localStorage.getItem('access_token')}`}})
          .then(res => {console.log("User successfully logged out")})
          .catch(err => console.error(err));
    },

    sendMessage : (messageObject) => {
        axios
          .post(`${BASE_URL}chat/send`, messageObject,{headers : {Authorization : `Bearer ${localStorage.getItem('access_token')}`}})
          .then(res => console.log(res.data))
          .catch(err => console.error(err));
    },

    loadChatForUser : (leastId, username, updateChat, firstOpening = false) => {
        axios
          .get(`${BASE_URL}chat/load-with-less-id/${leastId}/${username}`, {headers : {Authorization : `Bearer ${localStorage.getItem('access_token')}`}})
          .then(res => {
              console.log(res.data);
              if (res.data.length > 0) {
                  updateChat(username, res.data, firstOpening);
              }
          })
          .catch(err => console.error(err));
    }

}

export default UserService;