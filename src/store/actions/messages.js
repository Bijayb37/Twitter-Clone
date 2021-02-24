import {apiCall} from "../../services/api"
import {addError} from "./error"
import {LOAD_MESSAGES, REMOVE_MESSAGES} from "../actionTypes"

export function loadMessages(messages) {
    return {
        type: LOAD_MESSAGES,
        messages
    }
}

export function removeMessages(id) {
    return {
        type: REMOVE_MESSAGES,
        id
    }
}

export function getMessages() {
    return dispatch => {
        apiCall("get", "api/messages")
        .then(res => dispatch(loadMessages(res)))
        .catch(err => dispatch(addError(err.message)))
    }
}

//api/users/:id/messages
export function postNewMessage(text) {
    return (dispatch, getState) => {
        const {currentUser} = getState()
        const id = currentUser.user.id
        return apiCall("post", `api/users/${id}/messages`, {text})
        .then(res => {})
        .catch(err => dispatch(addError(err.message)))
    }
}

// api/users/:id/messages/:message_id
export function deleteMessage(id, message_id) {
    return (dispatch, getState) => {
        return apiCall("delete", `api/users/${id}/messages/${message_id}`)
        .then(res => dispatch(removeMessages(message_id)))
        .catch(err => dispatch(addError(err.message)))
    }
}