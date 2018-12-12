import * as LoginActionType from '../actions/LoginActionType'

const defaultState = {
    token:'',
    status:'not login'
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
                    status: 'Login success'
                }
            case LoginActionType.LOGIN_FAILED:
                return {
                    ...state,
                    token:'',
                    status: 'Login failed'
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