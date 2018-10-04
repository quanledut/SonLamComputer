const LOGIN_PREFIX = "LOGIN_CONSTANTS_";

const LOGIN_REQUEST = LOGIN_PREFIX + "LOGIN_REQUEST"
const LOGIN_REQUEST_BEGIN = LOGIN_REQUEST + "_BEGIN"
const LOGIN_REQUEST_SUCCESS = LOGIN_REQUEST + "_SUCCESS"
const LOGIN_REQUEST_FAILURE = LOGIN_REQUEST + "_FAIL"

const REGISTER_PREFIX = "REGISTER_CONSTANTS_"

const REGISTER_REQUEST = REGISTER_PREFIX + "REQUEST";
const REGISTER_REQUEST_BEGIN = REGISTER_REQUEST + "_BEGIN"
const REGISTER_REQUEST_SUCCESS = REGISTER_REQUEST + "_SUCCESS"
const REGISTER_REQUEST_FAILURE = REGISTER_REQUEST + "_FAILURE"

export const CONSTANTS = {
    LOGIN_REQUEST,
    LOGIN_REQUEST_BEGIN,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILURE,

    REGISTER_REQUEST,
    REGISTER_REQUEST_BEGIN,
    REGISTER_REQUEST_SUCCESS,
    REGISTER_REQUEST_FAILURE
}

export function loginRequest(data) {
    return {type: CONSTANTS.LOGIN_REQUEST, data}
}

export function loginRequestBegin() {
    return {type: CONSTANTS.LOGIN_REQUEST_BEGIN}
}

export function loginRequestSuccess(data) {
    return {type: CONSTANTS.LOGIN_REQUEST_SUCCESS, data}
}

export function loginRequestFailure(error) {
    return {type: CONSTANTS.LOGIN_REQUEST_FAILURE, error}
}

export function registerRequest(data) {
    return {type: CONSTANTS.REGISTER_REQUEST, data}
}

export function isLoggedIn() {
    return localStorage.getItem('token') != null
}