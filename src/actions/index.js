import * as actionTypes from './types'

export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}
export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}


export const openModal = content => {
    return {
        type: actionTypes.OPEN_MODAL,
        payload: {
            content
        }
    }
}
export const closeModal = () => {
    return {
        type: actionTypes.CLOSE_MODAL
    }
}

export const setCurrentChannel = channel => {
    return {
        type: actionTypes.SET_CURRENT_CHSNNEL,
        payload: {
            currentChannel: channel
        }
    }
}