import React from 'react'

import { Card } from "react-bootstrap"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './post-item.css'

const PostItem = ({ post }) => {

    const getProfilePictureOrAlternate = (display_picture) => {
        return (display_picture !== undefined && display_picture !== null && display_picture !== '') ? (!display_picture.includes('http://')) ? `${display_picture}` : display_picture : 'image/no-image.png';
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

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

                    <div className="attachment-div  col-md-12">
                        {post.attachments != null && JSON.parse(post.attachments).length > 0 &&
                            // JSON.parse(post.attachments).map(attachment =>
                            // <img src={attachment} />
                            <div>

                                <Carousel responsive={responsive}>
                                    {
                                        JSON.parse(post.attachments).map((attachment, index) =>
                                            <div>
                                                {!attachment.endsWith(".mp4") && <img
                                                    className="d-block w-100"
                                                    src={attachment}
                                                    alt="Unable to load image"
                                                />}

                                                {attachment.endsWith(".mp4") &&
                                                    <video  controls className="d-block w-100" id={"videoPlayer" + index} muted="muted" preload="metadata">
                                                        <source src={attachment} type="video/mp4" />
                                                    </video>
                                                }
                                            </div>
                                        )
                                    }
                                </Carousel>
                            </div>
                            // )
                        }
                    </div>
                </Card.Body>
            </Card>
        </div>
    );

}


export default PostItem;