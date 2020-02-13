import axios from 'axios'
const BASE_URL = 'http://localhost:3001/'

const PostPageService = {
    addPosts : async (postContent) => {
        try {
            return await axios
            .post(`${BASE_URL}post`, {content : postContent}, {
                headers : {Authorization : 'Bearer ' + localStorage.getItem('access_token')}
            });
        } catch (e) {
            console.dir(e.response);
            if (e.response.status == 401) {
                localStorage.removeItem('access_token');
                window.location.replace('/login');
            }
            return false;
        }
        
    }
}


export default PostPageService;