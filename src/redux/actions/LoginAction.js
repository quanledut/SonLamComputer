import * as LoginActionType from './LoginActionType'

export const checkLogin = () => {
    return{
        type: LoginActionType.CHECK_LOGIN
    }
}

export const requestLogin = (username, password) => {
    return{
        type: LoginActionType.REQUEST_LOGIN,
        username,
        password
    }
}

export const loginSucess = (token) => {
    return{
        type: LoginActionType.LOGIN_SUCCESS,
        token
    }
}

export const loginFailed = (err) => {
    return{
        type: LoginActionType.LOGIN_FAILED,
        err
    }
}