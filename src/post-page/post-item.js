import React from 'react'

import { Card } from "react-bootstrap"
import './post-item.css'

const PostItem = ({ post }) => {

    return (
        <div className='post-item-container post'>
            <Card>
                <Card.Body>
                    <div id='post-item-header'>
                        <div className="flexdev">
                            <img src='image/logo.png' alt='noImage' className='userImage ' />
                            <div className='poster-name image-text'>
                                <span >{post.user.first_name} {post.user.last_name}</span><br />
                                <span>{post.createdAt}</span>
                            </div>
                        </div>
                    </div>

                    <div className='post-content'>
                        {post.content}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );

}


export default PostItem;