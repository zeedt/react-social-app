import './DefaultPage.css'
import React from 'react';
import { withRouter } from 'react-router';
import Users from '../user/user';
import PostPage from '../post-page/post-page';
import {Image} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_SOCIAL_APP_BASE_URL}`;


class DefaultPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedFile : undefined,
            display_picture : localStorage.getItem('display_picture'),
            uploading : false
        }

        this.handleFileChange = this.handleFileChange.bind(this);
    }

    getImageFullPath = (dp) => {
        return dp === undefined || dp === '' || dp===null ? 'image/no-image.png' : dp;
    }

    updateDisplayPicture = (e)=> {
        e.preventDefault();
        var formData = new FormData();
        console.log(this.state.selectedFile);
        formData.append('file', this.state.selectedFile);
        console.dir(formData);
        this.setState({uploading : true});
        axios
          .post(`${BASE_URL}upload-image`, formData, {headers : {Authorization : 'Bearer ' + localStorage.getItem('access_token') , 'content-type': 'multipart/form-data'}})
          .then(res => {
              console.log("Successfully uploaded image");
              localStorage.setItem('display_picture', res.data.display_picture );
              this.setState({
                display_picture : res.data.display_picture,
                uploading : false
              });
            })
          .catch(err => {this.setState({uploading : false}); console.error(err)});
    }

    handleFileChange = (e) => {
        this.setState({selectedFile : e.target.files[0]});
    }
    render() {
        return (

            <div className="col-md-12">


                <div className=" col-md-3 chatDiv mydivs">
                    <Users />
                </div>
                <div className=" col-md-6 mydivs postDiv">

                    <PostPage history={this.props.history} />

                </div>

                <div className=" col-md-3 mydivs user-info-div">
                <Image className='profile-picture' src = {this.state.display_picture} width={200} height={200} roundedCircle />
                <form onSubmit={this.updateDisplayPicture} className='image-upload-form'>

                <input type="file" name='file' className='form-control image-input' onChange={this.handleFileChange} placeholder='Update display picture' /> <p/>
                <input type='submit' className='btn btn-primary btn-sm' value={!this.state.uploading ? 'Update Profile Picture' : 'Upload in progress'} disabled={this.state.uploading} />
                {/* <FontAwesomeIcon onClick={this.updateDisplayPicture} icon={faUpload}  /> */}
                </form>

                <div>
                    Name : {localStorage.first_name} {localStorage.last_name}<p/>
                    Email : {localStorage.email}<p/>
                    Gender : {localStorage.gender}<p/>
                </div>
                </div>

                </div>
        )
    }
}

export default withRouter(DefaultPage);