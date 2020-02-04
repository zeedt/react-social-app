// import axios from 'axios'


// const loadPosts = async () => {
//     try {
//         const responseData = await axios
//         .get(POST_URL, {
//             headers : {Authorization : 'Bearer ' + localStorage.getItem('access_token')}
//         });
  
//       console.dir(responseData);
//       return responseData.data;
//     } catch (e) {
//         console.dir(e.response);
//         if (e.response.status == 401) {
//             localStorage.removeItem('access_token');
//             window.location.replace('/login');
//         }
//     }
    
// }

// export default loadPosts;