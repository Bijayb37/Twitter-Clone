import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getMessages } from "../store/actions/messages"
import MessageItem from '../components/MessageItem'

function MessageList(props) {
    const { messages, getMessages } = props
    console.log(messages)
    useEffect(() => {
        getMessages()
    }, [])

    const messageList = messages.map((m) => (
        <MessageItem
            key={m._id}
            date={m.createdAt}
            text={m.text}
            username={m.user.username}
            profileImageUrl={m.user.profileImageUrl}
        />
    ))

    return (
        <div className="row">
            <div className="offset-1 ">
                {messageList}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps, { getMessages })(MessageList)