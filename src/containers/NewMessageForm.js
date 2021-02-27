import React, { useState } from 'react'
import { connect } from 'react-redux'
import {postNewMessage} from "../store/actions/messages"

function NewMessageForm(props) {
    const {postNewMessage, errors, history, removeError} = props
    const {isAuthenticated} = props.currentUser
    const [value, setValue] = useState("")
    function handleChange(e) {
        setValue(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(isAuthenticated) {
            postNewMessage(value)
            setValue("")
            history.push("/")
        }
    }
    history.listen(() => {
        removeError()
    })
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {errors.message && (
                    <div className="alert alert-danger">{errors.message}</div>
                )}
                <label htmlFor="newmessage">New Message &nbsp;</label>
                <input onChange={handleChange} value={value} type="text" id="newmessage" name="newmessage" />
                <button className="btn btn-success">Create New Message</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        errors: state.errors
    }
}
    
export default connect(mapStateToProps, {postNewMessage})(NewMessageForm)