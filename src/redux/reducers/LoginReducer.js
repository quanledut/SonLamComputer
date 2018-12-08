import * as LoginActionType from '../actions/LoginActionType'

const defaultState = {
    token:'',
    err:''
}

export default LoginReducer = (state,action) => {
    switch(action.type)
        {
            case LoginActionType.CHECK_LOGIN:
                return{
                    state
                }
            case LoginActionType.LOGIN_SUCCESS: 
                return{
                    ...state,
                    token: action.token
                }
            case LoginActionType.LOGIN_FAILED:
                return{
                    ...state,
                    err: action.err
                }
            default:
                return state
        }
}