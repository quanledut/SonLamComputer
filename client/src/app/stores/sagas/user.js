import {take, call, put, fork} from 'redux-saga/effects'

import * as userActions from '../../actions/user'

import { getListUserApi, deleteUserApi, addUserApi, getListUserByIdApi, updateUserApi } from '../../api/usermanager'

export function * getListAllUser() {
    while (true) {
        yield take(userActions.CONSTANTS.FIND_ALL_REQUEST)
        try {
            let result = yield call(getListUserApi)
            yield put(userActions.findALlSuccess(result))
        } catch(err) {
            // yield put(userActions.listAllUserFailure(err.message))
        }
    }
}

// export function * deleteUser() {
//     while (true) {
//         const request = yield take(userActions.CONSTANTS.DELETE_USER_REQUEST)
//         const {id} = request.data
//         try {
//             let result = yield call(deleteUserApi, id)
//             yield put(userActions.deleteUserSuccess(result))
//         } catch(err) {
//             // yield put(userActions.deleteUserFailure(err.message))
//         }
//     }
// }

export function * addUser() {
    while (true) {
        const request = yield take(userActions.CONSTANTS.CREATE_REQUEST)
        try {
            let result = yield call(addUserApi, request.data)
    
            request.cb(result, null)
            yield put(userActions.createRequestSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
            // yield put(createUserFailure(err.message))
        }
    }
}

export function * getUserById() {
    while (true) {
        const request = yield take(userActions.CONSTANTS.GET_USER_BY_ID_REQUEST)
        const {id} = request.data
        
        // try {
        //     let {result, timeout} = yield race({
        //         result: call(getListUserByIdApi, id),
        //         timeout: call(delay , 5000)
        //     })
        //     if (!timeout) yield put(getUserByIdSuccess(result))
        //     else yield put(getUserByIdFailure("Timeout"))
        // } catch(err) {
        //     yield put(getUserByIdFailure(err.message))
        // }
    }
}

export function * updateUser() {
    while (true) {
        const request = yield take(userActions.CONSTANTS.UPDATE_USER_REQUEST)
        const data = request.data

        // try {
        //     let {result, timeout} = yield race({
        //         result: call(updateUserApi, data),
        //         timeout: call(delay , 5000)
        //     })
        //     if (!timeout) yield put(editUserSuccess(result))
        //     else yield put(editUserFailure("Timeout"))
        // } catch(err) {
        //     yield put(editUserFailure(err.message))
        // }
    }
}

export default function * root () {
    yield fork(addUser)
    yield fork(getListAllUser)
    yield fork(getUserById)
    yield fork(updateUser)
}