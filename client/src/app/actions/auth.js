const LOGIN_PREFIX = "LOGIN_CONSTANTS_";

const LOGIN_REQUEST = LOGIN_PREFIX + "LOGIN_REQUEST"
const LOGIN_REQUEST_BEGIN = LOGIN_REQUEST + "_BEGIN"
const LOGIN_REQUEST_SUCCESS = LOGIN_REQUEST + "_SUCCESS"

const REGISTER_PREFIX = "REGISTER_CONSTANTS_"

const REGISTER_REQUEST = REGISTER_PREFIX + "REQUEST";
const REGISTER_REQUEST_SUCCESS = REGISTER_REQUEST + "_SUCCESS"

export const CONSTANTS = {
    LOGIN_REQUEST,
    LOGIN_REQUEST_BEGIN,
    LOGIN_REQUEST_SUCCESS,

    REGISTER_REQUEST,
    REGISTER_REQUEST_SUCCESS
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

export function registerRequestSuccess(data) {
    return {type: CONSTANTS.REGISTER_REQUEST_SUCCESS, data}
}

export function isLoggedIn() {
    return localStorage.getItem('token') != null
}