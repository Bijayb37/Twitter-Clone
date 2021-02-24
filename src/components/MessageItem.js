import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import defaultProfileImg from '../images/default-profile-image.jpg'
import deleteMessage from "../store/actions/messages"

const MessageItem = (props) => {
    const { date, profileImgUrl, text, username, deleteMessage, messageId, userId, isCorrectUser } = props
    return (
        <div>
            <li className="list-group-item">
                <img src={profileImgUrl || defaultProfileImg} alt={username} height="100" width="100" className="timeline-image" />
                <div className="message-area">
                    <Link to="/">@{username} &nbsp;</Link>
                    <span className="text-muted">
                        <Moment className="text-muted" format="Do MMM YYYY">
                            {date}
                        </Moment>
                    </span>
                    <i class="bi bi-three-dots" data-bs-toggle="dropdown"></i>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        
                        <li>{isCorrectUser && <a onClick={() => deleteMessage(userId, messageId)} class="dropdown-item" href="#">Delete Message</a>}</li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    <p>{text}</p>
                    
                </div>
            </li>
        </div>
    )
}

export default MessageItem