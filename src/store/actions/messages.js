import {apiCall} from "../../services/api"
import {addError} from "./error"
import {LOAD_MESSAGES, REMOVE_MESSAGES} from "../actionTypes"

export function loadMessages(messages) {
    return {
        type: LOAD_MESSAGES,
        messages
    }
}

export function getMessages() {
    return dispatch => {
        apiCall("get", "api/messages")
        .then(res => dispatch(loadMessages(res)))
        .catch(err => dispatch(addError(err.message)))
    }
}