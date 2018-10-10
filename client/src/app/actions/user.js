


const USER_PREFIX = "USER_CONSTANT";
const FIND_ALL_REQUEST = USER_PREFIX + "_FIND_ALL_REQUEST"
const FIND_ALL_REQUEST_SUCCESS = FIND_ALL_REQUEST + "_SUCCESS"

const CREATE_REQUEST = USER_PREFIX + "_CREATE_REQUEST"
const CREATE_REQUEST_SUCCESS = CREATE_REQUEST + "_SUCCESS"

const DELETE_REQUEST = USER_PREFIX + "_DELETE_REQUEST";
const DELETE_REQUEST_SUCCESS = DELETE_REQUEST + "_SUCCESS"

const UPDATE_REQUEST = USER_PREFIX + "_UPDATE_REQUEST";
const UPDATE_REQUEST_SUCCESS = UPDATE_REQUEST + "_SUCCESS"

const FIND_BY_ID_REQUEST = USER_PREFIX + "_FIND_BY_ID_REQUEST";


export const CONSTANTS = {
    FIND_ALL_REQUEST,
    FIND_ALL_REQUEST_SUCCESS,

    CREATE_REQUEST,
    CREATE_REQUEST_SUCCESS,

    DELETE_REQUEST,
    DELETE_REQUEST_SUCCESS,

    UPDATE_REQUEST,
    UPDATE_REQUEST_SUCCESS,

    FIND_BY_ID_REQUEST,
}

export function findAllRequest() {
    return {type: CONSTANTS.FIND_ALL_REQUEST}
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
export function deleteRequest(data) {
    return {type: CONSTANTS.DELETE_REQUEST, data}
}

export function deleteRequestSuccess(data) {
    return {type: CONSTANTS.DELETE_REQUEST_SUCCESS, data}
}

//------------------------------------------------------------
export function updateRequest(data) {
    return {type: CONSTANTS.UPDATE_REQUEST, data}
}

export function updateRequestSuccess(data) {
    return {type: CONSTANTS.UPDATE_REQUEST_SUCCESS, data}
}

//--------------------------------------------------------------
export function findByIdRequest(id) {
    return {type: CONSTANTS.FIND_BY_ID_REQUEST, id}
}
