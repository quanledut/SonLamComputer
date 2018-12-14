import * as LoginActionType from '../actions/LoginActionType'

const defaultState = {
    token:'',
    loginSuccess: ''
}

export default LoginReducer = (state = defaultState,action) => {
    switch(action.type)
        {
            case LoginActionType.CHECK_LOGIN:
                return {
                    state
                }
            case LoginActionType.LOGIN_SUCCESS: 
                console.log('reducer login success')
                return {
                    ...state,
                    token: action.token,
                    loginSuccess: 'Login success'
                }
            case LoginActionType.LOGIN_FAILED:
                return {
                    ...state,
                    token:'',
                    loginSuccess: 'Login failed'
                }
            case LoginActionType.IS_LOGGED_IN:
                return {
                    ...state,
                    token: action.token
                }
            case LoginActionType.IS_NOT_LOGGED_IN:
                return {
                    ...state,
                    token:''
                }
            case LoginActionType.LOGOUT_SUCCESS:
                return {
                    ...state,
                    token:''
                }
            default:
                return state
        }
}