


const LIST_ALL_USER_PREFIX = "LIST_ALL_USER_CONSTANTS_";
const LIST_ALL_USER_REQUEST = LIST_ALL_USER_PREFIX + "REQUEST"
const LIST_ALL_USER_REQUEST_SUCCESS = LIST_ALL_USER_REQUEST + "_SUCCESS"

const CREATE_USER_PREFIX = "CREATE_USER_CONSTANTS_"
const CREATE_USER_REQUEST = CREATE_USER_PREFIX + "REQUEST";
const CREATE_USER_REQUEST_SUCCESS = CREATE_USER_REQUEST + "_SUCCESS"

const DELETE_USER_PREFIX = "DELETE_USER_CONSTANTS_"
const DELETE_USER_REQUEST = DELETE_USER_PREFIX + "REQUEST";
const DELETE_USER_REQUEST_SUCCESS = DELETE_USER_REQUEST + "_SUCCESS"

const UPDATE_USER_PREFIX = "UPDATE_USER_CONSTANTS_"
const UPDATE_USER_REQUEST = UPDATE_USER_PREFIX + "REQUEST";
const UPDATE_USER_REQUEST_SUCCESS = UPDATE_USER_REQUEST + "_SUCCESS"

const GET_USER_BY_ID_PREFIX = "GET_USER_BY_ID_CONSTANTS_"
const GET_USER_BY_ID_REQUEST = GET_USER_BY_ID_PREFIX + "REQUEST";


export const CONSTANTS = {
    LIST_ALL_USER_REQUEST,
    LIST_ALL_USER_REQUEST_SUCCESS,

    CREATE_USER_REQUEST,
    CREATE_USER_REQUEST_SUCCESS,

    DELETE_USER_REQUEST,
    DELETE_USER_REQUEST_SUCCESS,

    UPDATE_USER_REQUEST,
    UPDATE_USER_REQUEST_SUCCESS,

    GET_USER_BY_ID_REQUEST,
}

export function listAllUserRequest() {
    return {type: CONSTANTS.LIST_ALL_USER_REQUEST}
}

export function listAllUserSuccess(data) {
    return {type: CONSTANTS.LIST_ALL_USER_REQUEST_SUCCESS, data}
}

//----------------------------------------------------------------------
export function createUserRequest(data, cb) {
    return {type: CONSTANTS.CREATE_USER_REQUEST, data, cb}
}

export function createUserSuccess(data) {
    return {type: CONSTANTS.CREATE_USER_REQUEST_SUCCESS, data}
}

//--------------------------------------------------------------
export function deleteUserRequest(data) {
    return {type: CONSTANTS.DELETE_USER_REQUEST, data}
}

export function deleteUserSuccess(data) {
    return {type: CONSTANTS.DELETE_USER_REQUEST_SUCCESS, data}
}

//------------------------------------------------------------
export function updateUserRequest(data) {
    return {type: CONSTANTS.UPDATE_USER_REQUEST, data}
}

export function updateUserSuccess(data) {
    return {type: CONSTANTS.UPDATE_USER_REQUEST_SUCCESS, data}
}

//--------------------------------------------------------------
export function getUserByIdRequest(id) {
    return {type: CONSTANTS.GET_USER_BY_ID_REQUEST, id}
}
