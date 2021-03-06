import axios from 'axios'

const LOGIN_URL = 'http://localhost:3001/oauth/token?grant_type=password';
const SIGNUP_URL = 'http://localhost:3001/signup';
const CLIENT_ID = 'zeed';
const CLIENT_SECRET = 'password';
const DEFAULT_ERROR_MESSAGE = 'An error occurred. Kindly contact admin or try again';

const login = async (loginData) => {
    try {
        loginData.grant_type = 'password';
        console.log('login data ' + JSON.stringify(loginData));
        var response = await axios.post(LOGIN_URL, loginData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getBase64StringFromClientCredentials()
            }
        });
        return response.data;

    } catch (e) {
        console.dir(e.response);
        console.log("error occurred due to " + e.response);
        var message = '';
        if (e.response && e.response.data) {
            message = (e.response.data.error_description && e.response.data.error_description.includes('Invalid resource')) ? 'Invalid Credentials' : e.response.data.message;
        } else if (e.error) {
            message = e.error;
        } else {
            message = DEFAULT_ERROR_MESSAGE;
        }
        return {message : message};
    }

}
const signUp = async (signUpData) => {
    try {
        console.log('login data ' + JSON.stringify(signUpData))
        await axios.post(SIGNUP_URL, signUpData);
        return {successful : true};
    } catch (e) {
        console.dir(e.response);
        console.log("error occurred due to " + e);
        var message = '';
        if (e.response && e.response.data) {
            message = e.response.data.message;
        } else if (e.error) {
            message = e.error;
        } else {
            message = DEFAULT_ERROR_MESSAGE;
        }
        return {message : message};
    }
}

const getBase64StringFromClientCredentials = () => {
    const encodedString = 'Basic ' + (new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'));
    return encodedString;
}


export default { login, signUp };