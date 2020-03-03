import React from 'react';
import {} from 'react-bootstrap'

class UserSearchList extends React.Component {

    getImageFullPath = (dp) => {
        return dp === undefined || dp === '' || dp===null ? 'image/no-image.png' : process.env.REACT_APP_SOCIAL_APP_BASE_URL+dp;
    }

    render() {
        return(
            <div className='user-search-list-item'>
                <img className='user-search-list-item-image' src={this.getImageFullPath(this.props.display_picture)} height={30} width={30} alt="" /> &nbsp; &nbsp;{this.props.first_name} {this.props.last_name}
            </div>
        )
    }
}


export default UserSearchList;