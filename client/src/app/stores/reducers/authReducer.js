import { CONSTANTS as AUTH_CONSTANTS } from '../../actions/auth'
import { callbackify } from 'util';

let initialState = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {},
    isLoggedIn: localStorage.getItem('token') ? true : false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_CONSTANTS.LOGIN_REQUEST_SUCCESS: {
            const token = action.data.token
            const currentUser = window.atob(token.split('.')[1])
            localStorage.setItem('token', token)
            localStorage.setItem('currentUser', currentUser)
            return {...state, token, currentUser, isLoggedIn: true}
        }
        default:
            return state
    }
}

export default reducer