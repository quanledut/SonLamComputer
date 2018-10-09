const LOGIN_PREFIX = "LOGIN_CONSTANTS_";

const LOGIN_REQUEST = LOGIN_PREFIX + "LOGIN_REQUEST"
const LOGIN_REQUEST_BEGIN = LOGIN_REQUEST + "_BEGIN"
const LOGIN_REQUEST_SUCCESS = LOGIN_REQUEST + "_SUCCESS"
const LOGIN_REQUEST_FAILURE = LOGIN_REQUEST + "_FAIL"

const REGISTER_PREFIX = "REGISTER_CONSTANTS_"

const REGISTER_REQUEST = REGISTER_PREFIX + "REQUEST";

export const CONSTANTS = {
    LOGIN_REQUEST,
    LOGIN_REQUEST_BEGIN,
    LOGIN_REQUEST_SUCCESS,

    REGISTER_REQUEST,
}

export function loginRequest(data, cb) {
    return {type: CONSTANTS.LOGIN_REQUEST, data, cb}
}


export function loginRequestSuccess(data) {
    return {type: CONSTANTS.LOGIN_REQUEST_SUCCESS, data}
}

export function registerRequest(data, cb) {
    return {type: CONSTANTS.REGISTER_REQUEST, data, cb}
}

export function isLoggedIn() {
    return localStorage.getItem('token') != null
}