import * as LoginActionType from './LoginActionType'

export const checkLogin = () => {
    return{
        type: LoginActionType.CHECK_LOGIN
    }
}

export const requestLogin = (username, password,remember) => {
    return{
        type: LoginActionType.REQUEST_LOGIN,
        username,
        password,
        remember
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
