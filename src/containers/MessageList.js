import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getMessages, deleteMessage } from "../store/actions/messages"
import MessageItem from '../components/MessageItem'

function MessageList(props) {
    const { messages, getMessages, deleteMessage, currentUser } = props

    useEffect(() => {
        getMessages()
    }, [])

    const messageList = messages.map((m) => (
        <MessageItem
            key={m._id}
            messageId={m._id}
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

export default connect(mapStateToProps, { getMessages, deleteMessage })(MessageList)