import axios from 'axios'
const BASE_URL = process.env.REACT_APP_SOCIAL_APP_BASE_URL

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
        
    },

    addPostWithAttachment : async (postContent) => {
        try {
            return await axios
            .post(`${BASE_URL}post-with-attachment`, postContent, {
                headers : {Authorization : 'Bearer ' + localStorage.getItem('access_token'), 'content-type': 'multipart/form-data'}
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