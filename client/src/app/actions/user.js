const USER_PREFIX = "USER_CONSTANT";
const FIND_ALL_REQUEST = USER_PREFIX + "_FIND_ALL_REQUEST"
const FIND_ALL_REQUEST_SUCCESS = FIND_ALL_REQUEST + "_SUCCESS"

const CREATE_REQUEST = USER_PREFIX + "_CREATE_REQUEST"
const CREATE_REQUEST_SUCCESS = CREATE_REQUEST + "_SUCCESS"

const DELETE_REQUEST = USER_PREFIX + "_DELETE_REQUEST";
const DELETE_REQUEST_SUCCESS = DELETE_REQUEST + "_SUCCESS"

const UPDATE_REQUEST = USER_PREFIX + "_UPDATE_REQUEST";
const UPDATE_REQUEST_SUCCESS = UPDATE_REQUEST + "_SUCCESS"

const CHANGE_PASSWORD_REQUEST = USER_PREFIX + "_CHANGE_PASSWORD_REQUEST";
const CHANGE_PASSWORD_REQUEST_SUCCESS = CHANGE_PASSWORD_REQUEST + "_SUCCESS"

const FIND_BY_ID_REQUEST = USER_PREFIX + "_FIND_BY_ID_REQUEST";

const SEARCH_REQUEST = USER_PREFIX + "_SEARCH_REQUEST";

export const CONSTANTS = {
    FIND_ALL_REQUEST,
    FIND_ALL_REQUEST_SUCCESS,

    CREATE_REQUEST,
    CREATE_REQUEST_SUCCESS,

    DELETE_REQUEST,
    DELETE_REQUEST_SUCCESS,

    UPDATE_REQUEST,
    UPDATE_REQUEST_SUCCESS,

    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_REQUEST_SUCCESS,

    FIND_BY_ID_REQUEST,
    SEARCH_REQUEST,
}

export function findAllRequest(cb) {
    return {type: CONSTANTS.FIND_ALL_REQUEST, cb}
}

export function findALlSuccess(data) {
    return {type: CONSTANTS.FIND_ALL_REQUEST_SUCCESS, data}
}

//----------------------------------------------------------------------
export function createRequest(data, cb) {
    return {type: CONSTANTS.CREATE_REQUEST, data, cb}
}

export function createRequestSuccess(data) {
    return {type: CONSTANTS.CREATE_REQUEST_SUCCESS, data}
}

//--------------------------------------------------------------
export function deleteRequest(id, cb) {
    return {type: CONSTANTS.DELETE_REQUEST, id, cb}
}

export function deleteRequestSuccess(id) {
    return {type: CONSTANTS.DELETE_REQUEST_SUCCESS, id}
}

//------------------------------------------------------------
export function updateRequest(data, cb) {
    return {type: CONSTANTS.UPDATE_REQUEST, data, cb}
}

export function updateRequestSuccess(data) {
    return {type: CONSTANTS.UPDATE_REQUEST_SUCCESS, data}
}

export function changePasswordRequest(data, cb) {
    return {type: CONSTANTS.CHANGE_PASSWORD_REQUEST, data, cb}
}

export function changePasswordRequestSuccess(data) {
    return {type: CONSTANTS.CHANGE_PASSWORD_REQUEST_SUCCESS, data}
}



//--------------------------------------------------------------
export function findByIdRequest(id, cb) {
    return {type: CONSTANTS.FIND_BY_ID_REQUEST, id, cb}
}
//---------------------------------------------------------------------
export function searchRequest(keyword) {
    return {type: CONSTANTS.SEARCH_REQUEST, keyword}
}