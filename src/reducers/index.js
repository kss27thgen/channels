import { combineReducers } from 'redux'
import * as actionTypes from '../actions/types'

const initialState = {
    currentUser: null,
    isLoading: true
}

const user_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

const initialStateModal = {
    modalShow: false,
    content: ''
}

const modal_reducer = (state = initialStateModal, action) => {
    switch (action.type) {
        case actionTypes.OPEN_MODAL:
            return {
                modalShow: true,
                content: action.payload.content
            }
        case actionTypes.CLOSE_MODAL:
            return {
                modalShow: false,
                content: ''
            }
        default:
            return state;
    }
}

const initialChannleState = {
    currentChannel: {}
}

const channel_reducer = (state = initialChannleState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload.currentChannel
            }
        default:
            return state;
    }
}



const rootReducer = combineReducers({
    user: user_reducer,
    modal: modal_reducer,
    channel: channel_reducer
})

export default rootReducer;