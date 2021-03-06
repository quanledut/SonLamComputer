const _PREFIX = "CUSTOMER_CONSTANT";
const FIND_ALL_REQUEST = _PREFIX + "_FIND_ALL_REQUEST"
const FIND_ALL_REQUEST_SUCCESS = FIND_ALL_REQUEST + "_SUCCESS"

const CREATE_REQUEST = _PREFIX + "_CREATE_REQUEST"
const CREATE_REQUEST_SUCCESS = CREATE_REQUEST + "_SUCCESS"

const DELETE_REQUEST = _PREFIX + "_DELETE_REQUEST";
const DELETE_REQUEST_SUCCESS = DELETE_REQUEST + "_SUCCESS"

const UPDATE_REQUEST = _PREFIX + "_UPDATE_REQUEST";
const UPDATE_REQUEST_SUCCESS = UPDATE_REQUEST + "_SUCCESS"

const CHANGE_ACTIVE_REQUEST = _PREFIX + "_CHANGE_ACTIVE_REQUEST";
const CHANGE_ACTIVE_REQUEST_SUCCESS = CHANGE_ACTIVE_REQUEST + "_SUCCESS"

const FIND_BY_ID_REQUEST = _PREFIX + "_FIND_BY_ID_REQUEST";

const SEARCH_REQUEST = _PREFIX + "_SEARCH_REQUEST_REQUEST";

const FIND_ALL_CURRENT_USER_REQUEST = _PREFIX + "_FIND_ALL_CURRENT_USER_REQUEST"
const FIND_ALL_CURRENT_USER_REQUEST_SUCCESS = FIND_ALL_CURRENT_USER_REQUEST + "_SUCCESS"

export const CONSTANTS = {
    FIND_ALL_REQUEST,
    FIND_ALL_REQUEST_SUCCESS,

    CREATE_REQUEST,
    CREATE_REQUEST_SUCCESS,

    DELETE_REQUEST,
    DELETE_REQUEST_SUCCESS,

    UPDATE_REQUEST,
    UPDATE_REQUEST_SUCCESS,

    CHANGE_ACTIVE_REQUEST,
    CHANGE_ACTIVE_REQUEST_SUCCESS,

    FIND_BY_ID_REQUEST,
    SEARCH_REQUEST,

    FIND_ALL_CURRENT_USER_REQUEST,
    FIND_ALL_CURRENT_USER_REQUEST_SUCCESS
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

export function changeActiveRequest(data, cb) {
    return {type: CONSTANTS.CHANGE_ACTIVE_REQUEST, data, cb}
}

export function changeActiveRequestSuccess(data) {
    return {type: CONSTANTS.CHANGE_ACTIVE_REQUEST_SUCCESS, data}
}

//--------------------------------------------------------------
export function findByIdRequest(id, cb) {
    return {type: CONSTANTS.FIND_BY_ID_REQUEST, id, cb}
}
//---------------------------------------------------------------------
export function searchRequest(keyword) {
    return {type: CONSTANTS.SEARCH_REQUEST, keyword}
}

export function findCurrentUserInfo(cb) {
    return {type: CONSTANTS.FIND_ALL_CURRENT_USER_REQUEST, cb}
}

export function findCurrentUserInfoSuccess(data) {
    return {type: CONSTANTS.FIND_ALL_CURRENT_USER_REQUEST_SUCCESS, data}
}