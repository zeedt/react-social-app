import React from 'react'

import { Card } from "react-bootstrap"
import './post-item.css'

const PostItem = ({ post }) => {

    const getProfilePictureOrAlternate = (display_picture) => {
        return (display_picture !== undefined && display_picture !== null && display_picture !== '') ? (!display_picture.includes('http://')) ? `http://localhost:3001/${display_picture}` : display_picture : 'image/no-image.png';
    }


    const getStringDate = (dbDate) => {
        const date = new Date(dbDate);
        // return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (date.getDate()) + ' ' + (date.getHours()) + ':' + (date.getMinutes());
        return date.getFullYear() + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + (date.getDate()).toString().padStart(2, '0') + ' ' + (date.getHours()).toString().padStart(2, '0') + ':' + (date.getMinutes()).toString().padStart(2, '0');
    }

    return (
        <div className='post-item-container post'>
            <Card>
                <Card.Body>
                    <div id='post-item-header'>
                        <div className="flexdev">
                            <img src={getProfilePictureOrAlternate(post.user.display_picture)} alt='None' className='userImage ' />
                            <div className='poster-name image-text'>
                                <span >{post.user.first_name} {post.user.last_name}</span><br />
                                <span>{getStringDate(post.createdAt)}</span>
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