import axios from 'axios';
const BASE_URL = 'http://localhost:3001/'

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
        
    }

}

export default UserService;