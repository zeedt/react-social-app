import React from 'react';
import { Link, withRouter } from 'react-router-dom'

class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        
    }



    render(){
        return(
            <div>
                User information page
            </div>
        )
    }

}



export default withRouter(UserInfo);