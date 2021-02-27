import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getMessages, deleteMessage, updateLikes, patchLikes, patchText } from "../store/actions/messages"
import MessageItem from '../components/MessageItem'

function MessageList(props) {
    const {patchText, messages, getMessages, deleteMessage, currentUser, patchLikes } = props

    useEffect(() => {
        getMessages() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const messageList = messages.map((m) => (
        <MessageItem
            key={m._id}
            likes={m.likes}
            edit={patchText}
            messageId={m._id}
            update={patchLikes}
            deleteMessage={deleteMessage}
            date={m.createdAt}
            text={m.text}
            username={m.user.username}
            userId={m.user._id}
            profileImageUrl={m.user.profileImageUrl}
            isCorrectUser={m.user._id === currentUser.user.id}
        />
    ))

    return (
        <div className="col-sm-8">
            <div className="offset-2 col-8">
                <ul className="list-group" id="messages">
                    <h1>Logged in as {currentUser.user.username}</h1>
                    {messageList}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, { patchText, getMessages, deleteMessage, updateLikes, patchLikes })(MessageList)