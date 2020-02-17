import './DefaultPage.css'
import React from 'react';
import { withRouter } from 'react-router';
import Users from '../user/user';
import PostPage from '../post-page/post-page';
import {Image} from 'react-bootstrap'




class DefaultPage extends React.Component {
    getImageFullPath = (dp) => {
        return dp === undefined || dp === '' || dp===null ? 'image/no-image.png' : "http://localhost:3001/"+dp;
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
                <Image className='profile-picture' src = {this.getImageFullPath(localStorage.display_picture)} width={200} height={200} roundedCircle />

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