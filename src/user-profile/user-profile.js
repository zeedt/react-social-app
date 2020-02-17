import React from 'react'
import { Table, Image } from 'react-bootstrap'
import './user-profile.css';
import { withRouter } from 'react-router';
import axios from 'axios';
const BASE_URL = 'http://localhost:3001/';

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        console.dir(props.match.params);
        if (!props.match.params.username) {
            window.location.href('/');
        }
        this.state = {
            userInfo: {},
            loading: true
        }
        const username = props.match.params.username;
        axios
            .get(`${BASE_URL}find-user/${username}`)
            .then(res => {
                this.setState({
                    userInfo: res.data,
                    loading: false
                })
            })
            .catch(err => {
                console.error(err)
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            });

    }

    getImageFullPath = (dp) => {
        return dp === undefined || dp === '' || dp===null ? 'image/no-image.png' : "http://localhost:3001/"+dp;
    }

    render() {



        return (
            this.state.loading ? <div>Loading</div>
                :
                <div className="row user-profile">
                    <div className='col-md-3 user-profile-image'>
                        <Image src = {this.getImageFullPath(this.state.userInfo.display_picture)} width={200} height={200} roundedCircle />
                </div>

                    <div className='col-md-6 info-display' >
                        <Table responsive>
                            <tbody striped>
                                <tr>
                                    <td>Username</td>
                                    <td>{this.state.userInfo.username}</td>
                                </tr>
                                <tr>
                                    <td>First Name</td>
                                    <td>{this.state.userInfo.first_name}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>{this.state.userInfo.last_name}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{this.state.userInfo.gender}</td>
                                </tr>
                                <tr>
                                    <td>Email Address</td>
                                    <td>{this.state.userInfo.email}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
        )

    }

}

export default withRouter(UserProfile);