const PREFIX = "PAYMENT_CONSTANT";
const FIND_ALL_REQUEST = PREFIX + "_FIND_ALL_REQUEST"
const FIND_ALL_REQUEST_SUCCESS = FIND_ALL_REQUEST + "_SUCCESS"

const UPDATE_REQUEST = PREFIX + "_UPDATE_REQUEST";
const UPDATE_REQUEST_SUCCESS = UPDATE_REQUEST + "_SUCCESS"

const FIND_BY_ID_REQUEST = PREFIX + "_FIND_BY_ID_REQUEST";

const SEARCH_REQUEST = PREFIX + "_SEARCH_REQUEST_REQUEST";

export const CONSTANTS = {
    FIND_ALL_REQUEST,
    FIND_ALL_REQUEST_SUCCESS,

    UPDATE_REQUEST,
    UPDATE_REQUEST_SUCCESS,

    FIND_BY_ID_REQUEST,
    SEARCH_REQUEST,
}

export function findAllRequest(query, cb) {
    if (cb) return {type: CONSTANTS.FIND_ALL_REQUEST, query, cb}
    else return {type: CONSTANTS.FIND_ALL_REQUEST, cb: query}
}

export function findALlSuccess(data) {
    return {type: CONSTANTS.FIND_ALL_REQUEST_SUCCESS, data}
}

//------------------------------------------------------------
export function updateRequest(data,cb) {
    return {type: CONSTANTS.UPDATE_REQUEST, data, cb}
}

export function updateRequestSuccess(data) {
    return {type: CONSTANTS.UPDATE_REQUEST_SUCCESS, data}
}

//--------------------------------------------------------------
export function findByIdRequest(id, cb) {
    return {type: CONSTANTS.FIND_BY_ID_REQUEST, id, cb}
}

//---------------------------------------------------------------------
export function searchRequest(keyword) {
    return {type: CONSTANTS.SEARCH_REQUEST, keyword}
}