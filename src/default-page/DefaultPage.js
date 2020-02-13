import './DefaultPage.css'
import React from 'react';
import { withRouter } from 'react-router';
import Users from '../user/user';
import PostPage from '../post-page/post-page';




class DefaultPage extends React.Component {
    render() {
        return (

            <div className="col-md-12">


                <div className=" col-md-3 chatDiv mydivs">
                    <Users />
                </div>
                <div className=" col-md-6 mydivs postDiv">

                    <PostPage history={this.props.history} />

                </div>

                <div className=" col-md-3 mydivs">

                </div>

            </div>



        )
    }
}

export default withRouter(DefaultPage);