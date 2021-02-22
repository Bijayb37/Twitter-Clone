import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import defaultProfileImg from '../images/default-profile-image.jpg'


const MessageItem = ({date, profileImgUrl, text,username}) => {
    return(
        <div>
            <img src={profileImgUrl || defaultProfileImg} alt={username} height ="100" width="100" className="timeline-image"/>
            <div className="message-area">
                <Link to="/">@{username} &nbsp;</Link>
                <span className="text-muted">
                    <Moment className="text-muted" format="Do MMM YYYY">
                        {date}
                    </Moment>
                </span> 
                <p>{text}</p>
            </div>
        </div>
    )
}

export default MessageItem