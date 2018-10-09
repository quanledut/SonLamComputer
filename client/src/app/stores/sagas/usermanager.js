import { delay } from 'redux-saga'
import {take, call, put, fork, race} from 'redux-saga/effects'

import * as actions from '../../actions/usermanager'

import { getListUserApi, deleteUserApi, addUserApi, getListUserByIdApi, updateUserApi } from '../../api/usermanager'

export function * getListAllUser() {
    while (true) {
        yield take(actions.CONSTANTS.LIST_ALL_USER_REQUEST)
        try {
            let result = yield call(getListUserApi)
            yield put(actions.listAllUserSuccess(result))
        } catch(err) {
            // yield put(actions.listAllUserFailure(err.message))
        }
    }
}

export function * deleteUser() {
    while (true) {
        const request = yield take(actions.CONSTANTS.DELETE_USER_REQUEST)
        const {id} = request.data
        try {
            let result = yield call(deleteUserApi, id)
            yield put(actions.deleteUserSuccess(result))
        } catch(err) {
            // yield put(actions.deleteUserFailure(err.message))
        }
    }
}

export function * addUser() {
    console.log(actions.CONSTANTS.CREATE_USER_REQUEST)

    while (true) {
        const request = yield take(actions.CONSTANTS.CREATE_USER_REQUEST)
        console.log(actions.CONSTANTS.CREATE_USER_REQUEST)
        try {
            let result = yield call(addUserApi, request.data)
    
            request.cb(result, null)
        } catch(err) {
            request.cb(null, err.message)
            // yield put(createUserFailure(err.message))
        }
    }
}

export function * getUserById() {
    while (true) {
        const request = yield take(actions.CONSTANTS.GET_USER_BY_ID_REQUEST)
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
        const request = yield take(actions.CONSTANTS.UPDATE_USER_REQUEST)
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
    yield fork(deleteUser)
    yield fork(getUserById)
    yield fork(updateUser)
}