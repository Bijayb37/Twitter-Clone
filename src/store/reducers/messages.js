import {LOAD_MESSAGES, REMOVE_MESSAGES} from "../actionTypes"

export default (state =[], action) => {
    switch(action.type) {
        case LOAD_MESSAGES:
            return [...action.messages]
        case REMOVE_MESSAGES:
            const newState = state.filter((msg) => msg._id !== action.id)
            return newState
        default:
            return state
    }
}