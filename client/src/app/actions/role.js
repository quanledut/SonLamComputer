const ROLE_PREFIX = "ROLE_CONSTANT"

const FIND_ALL_REQUEST = ROLE_PREFIX + "_FIND_ALL_REQUEST"

export const CONSTANTS = {
    FIND_ALL_REQUEST
}

export function findAllRequet(cb) {
    return {type: CONSTANTS.FIND_ALL_REQUEST, cb}
}
