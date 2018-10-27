import { CONSTANTS as AUTH_CONSTANTS } from '../../actions/auth'

let initialState = {
    token: '',
    currentUser: {},
    isLoggedIn: false,
}

const reducer = async (state = initialState, action) => {
    switch (action.type) {
        case AUTH_CONSTANTS.LOGIN_REQUEST_SUCCESS: {
            const token = action.data.token
            const currentUser = window.atob(token.split('.')[1])
            return {...state, token, currentUser, isLoggedIn: true}
        }
        default:
            return state
    }
}

export default reducer