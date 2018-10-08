const LIST_ALL_USER_PREFIX = "LIST_ALL_USER_CONSTANTS_";

const LIST_ALL_USER_REQUEST = LIST_ALL_USER_PREFIX + "REQUEST"
const LIST_ALL_USER_REQUEST_BEGIN = LIST_ALL_USER_REQUEST + "_BEGIN"
const LIST_ALL_USER_REQUEST_SUCCESS = LIST_ALL_USER_REQUEST + "_SUCCESS"
const LIST_ALL_USER_REQUEST_FAILURE = LIST_ALL_USER_REQUEST + "_FAIL"

const SAVE_USER_PREFIX = "SAVE_USER_CONSTANTS_"

const SAVE_USER_REQUEST = SAVE_USER_PREFIX + "REQUEST";
const SAVE_USER_REQUEST_BEGIN = SAVE_USER_REQUEST + "_BEGIN"
const SAVE_USER_REQUEST_SUCCESS = SAVE_USER_REQUEST + "_SUCCESS"
const SAVE_USER_REQUEST_FAILURE = SAVE_USER_REQUEST + "_FAILURE"

const DELETE_USER_PREFIX = "DELETE_USER_CONSTANTS_"

const DELETE_USER_REQUEST = DELETE_USER_PREFIX + "REQUEST";
const DELETE_USER_REQUEST_BEGIN = DELETE_USER_REQUEST + "_BEGIN"
const DELETE_USER_REQUEST_SUCCESS = DELETE_USER_REQUEST + "_SUCCESS"
const DELETE_USER_REQUEST_FAILURE = DELETE_USER_REQUEST + "_FAILURE"

const SEARCH_USER_PREFIX = "SEARCH_USER_CONSTANTS_"

const SEARCH_USER_REQUEST = SEARCH_USER_PREFIX + "REQUEST";
const SEARCH_USER_REQUEST_BEGIN = SEARCH_USER_REQUEST + "_BEGIN"
const SEARCH_USER_REQUEST_SUCCESS = SEARCH_USER_REQUEST + "_SUCCESS"
const SEARCH_USER_REQUEST_FAILURE = SEARCH_USER_REQUEST + "_FAILURE"

const EDIT_USER_PREFIX = "EDIT_USER_CONSTANTS_"

const EDIT_USER_REQUEST = EDIT_USER_PREFIX + "REQUEST";
const EDIT_USER_REQUEST_BEGIN = EDIT_USER_REQUEST + "_BEGIN"
const EDIT_USER_REQUEST_SUCCESS = EDIT_USER_REQUEST + "_SUCCESS"
const EDIT_USER_REQUEST_FAILURE = EDIT_USER_REQUEST + "_FAILURE"

const GET_USER_BY_ID_PREFIX = "GET_USER_BY_ID_CONSTANTS_"

const GET_USER_BY_ID_REQUEST = GET_USER_BY_ID_PREFIX + "REQUEST";
const GET_USER_BY_ID_REQUEST_BEGIN = GET_USER_BY_ID_REQUEST + "_BEGIN"
const GET_USER_BY_ID_REQUEST_SUCCESS = GET_USER_BY_ID_REQUEST + "_SUCCESS"
const GET_USER_BY_ID_REQUEST_FAILURE = GET_USER_BY_ID_REQUEST + "_FAILURE"

const IS_ADD = 'IS_ADD'
const IS_EDIT = 'IS_EDIT'

export const CONSTANTS = {
    LIST_ALL_USER_REQUEST,
    LIST_ALL_USER_REQUEST_BEGIN,
    LIST_ALL_USER_REQUEST_SUCCESS,
    LIST_ALL_USER_REQUEST_FAILURE,

    SAVE_USER_REQUEST,
    SAVE_USER_REQUEST_BEGIN,
    SAVE_USER_REQUEST_SUCCESS,
    SAVE_USER_REQUEST_FAILURE,

    DELETE_USER_REQUEST,
    DELETE_USER_REQUEST_BEGIN,
    DELETE_USER_REQUEST_SUCCESS,
    DELETE_USER_REQUEST_FAILURE,

    SEARCH_USER_REQUEST,
    SEARCH_USER_REQUEST_BEGIN,
    SEARCH_USER_REQUEST_SUCCESS,
    SEARCH_USER_REQUEST_FAILURE,

    EDIT_USER_REQUEST,
    EDIT_USER_REQUEST_BEGIN,
    EDIT_USER_REQUEST_SUCCESS,
    EDIT_USER_REQUEST_FAILURE,

    GET_USER_BY_ID_REQUEST,
    GET_USER_BY_ID_REQUEST_BEGIN,
    GET_USER_BY_ID_REQUEST_SUCCESS,
    GET_USER_BY_ID_REQUEST_FAILURE,

    IS_ADD,
    IS_EDIT
}

export function listAllUserRequest() {
    return {type: CONSTANTS.LIST_ALL_USER_REQUEST}
}

export function listAllUserBegin() {
    return {type: CONSTANTS.LIST_ALL_USER_REQUEST_BEGIN}
}

export function listAllUserSuccess(data) {
    return {type: CONSTANTS.LIST_ALL_USER_REQUEST_SUCCESS, data}
}

export function listAllUserFailure(error) {
    return {type: CONSTANTS.LIST_ALL_USER_REQUEST_FAILURE, error}
}
//----------------------------------------------------------------------
export function saveUserRequest(data) {
    return {type: CONSTANTS.SAVE_USER_REQUEST, data}
}

export function saveUserBegin() {
    return {type: CONSTANTS.SAVE_USER_REQUEST_BEGIN}
}

export function saveUserSuccess(data) {
    return {type: CONSTANTS.SAVE_USER_REQUEST_SUCCESS, data}
}

export function saveUserFailure(error) {
    return {type: CONSTANTS.SAVE_USER_REQUEST_FAILURE, error}
}
//--------------------------------------------------------------
export function deleteUserRequest(data) {
    return {type: CONSTANTS.DELETE_USER_REQUEST, data}
}

export function deleteUserBegin() {
    return {type: CONSTANTS.DELETE_USER_REQUEST_BEGIN}
}

export function deleteUserSuccess(data) {
    return {type: CONSTANTS.DELETE_USER_REQUEST_SUCCESS, data}
}

export function deleteUserFailure(error) {
    return {type: CONSTANTS.DELETE_USER_REQUEST_FAILURE, error}
}

export function is_add(){
    return {
        type: CONSTANTS.IS_ADD    
    }
}

export function is_edit(){
    return {
        type: CONSTANTS.IS_EDIT    
    }
}

export function searchUserRequest(data) {
    return {type: CONSTANTS.SEARCH_USER_REQUEST, data}
}
//------------------------------------------------------------
export function editUserRequest(data) {
    return {type: CONSTANTS.EDIT_USER_REQUEST, data}
}

export function editUserBegin() {
    return {type: CONSTANTS.EDIT_USER_REQUEST_BEGIN}
}

export function editUserSuccess(data) {
    return {type: CONSTANTS.EDIT_USER_REQUEST_SUCCESS, data}
}

export function editUserFailure(error) {
    return {type: CONSTANTS.EDIT_USER_REQUEST_FAILURE, error}
}
//--------------------------------------------------------------
export function getUserByIdRequest(id) {
    return {type: CONSTANTS.GET_USER_BY_ID_REQUEST, id}
}

export function getUserByIdBegin() {
    return {type: CONSTANTS.GET_USER_BY_ID_REQUEST_BEGIN}
}

export function getUserByIdSuccess(data) {
    return {type: CONSTANTS.GET_USER_BY_ID_REQUEST_SUCCESS, data}
}

export function getUserByIdFailure(error) {
    return {type: CONSTANTS.GET_USER_BY_ID_REQUEST_FAILURE, error}
}