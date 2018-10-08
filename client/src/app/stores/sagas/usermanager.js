import { delay } from 'redux-saga'
import {take, call, put, fork, race} from 'redux-saga/effects'
import {CONSTANTS as UESR_CONSTANTS } from '../../actions/usermanager'

import { listAllUserBegin, listAllUserSuccess, listAllUserFailure,
        deleteUserBegin, deleteUserSuccess, deleteUserFailure,
        saveUserBegin, saveUserSuccess, saveUserFailure,
        getUserByIdBegin, getUserByIdSuccess, getUserByIdFailure,
        editUserBegin, editUserSuccess, editUserFailure } from '../../actions/usermanager'

import { getListUserApi, deleteUserApi, addUserApi, getListUserByIdApi, updateUserApi } from '../../api/usermanager'

export function * getListAllUser() {
    while (true) {
        yield take(UESR_CONSTANTS.LIST_ALL_USER_REQUEST)
        yield put(listAllUserBegin())
        try {
            let {result, timeout} = yield race({
                result: call(getListUserApi),
                timeout: call(delay , 5000)
            })
            if (!timeout) yield put(listAllUserSuccess(result))
            else yield put(listAllUserFailure("Timeout"))
        } catch(err) {
            yield put(listAllUserFailure(err.message))
        }
    }
}

export function * deleteUser() {
    while (true) {
        const request = yield take(UESR_CONSTANTS.DELETE_USER_REQUEST)
        const {id} = request.data
        yield put(deleteUserBegin())
        try {
            let {result, timeout} = yield race({
                result: call(deleteUserApi, id),
                timeout: call(delay , 5000)
            })
            if (!timeout) yield put(deleteUserSuccess(result))
            else yield put(deleteUserFailure("Timeout"))
        } catch(err) {
            yield put(deleteUserFailure(err.message))
        }
    }
}

export function * addUser() {
    while (true) {
        const request = yield take(UESR_CONSTANTS.SAVE_USER_REQUEST)
        const { email, password, username, gender, 
            created_time, address, roles, fullname, phone } = request.data
        yield put(saveUserBegin())
        try {
            let {result, timeout} = yield race({
                result: call(addUserApi, username, email, fullname, address,
                                phone, roles, created_time, password, gender),
                timeout: call(delay , 5000)
            })
            if (!timeout) yield put(saveUserSuccess(result))
            else yield put(saveUserFailure("Timeout"))
        } catch(err) {
            yield put(saveUserFailure(err.message))
        }
    }
}

export function * getUserById() {
    while (true) {
        const request = yield take(UESR_CONSTANTS.GET_USER_BY_ID_REQUEST)
        const {id} = request.data
        yield put(getUserByIdBegin())
        try {
            let {result, timeout} = yield race({
                result: call(getListUserByIdApi, id),
                timeout: call(delay , 5000)
            })
            if (!timeout) yield put(getUserByIdSuccess(result))
            else yield put(getUserByIdFailure("Timeout"))
        } catch(err) {
            yield put(getUserByIdFailure(err.message))
        }
    }
}

export function * updateUser() {
    while (true) {
        const request = yield take(UESR_CONSTANTS.EDIT_USER_REQUEST)
        const data = request.data
        yield put(editUserBegin())
        try {
            let {result, timeout} = yield race({
                result: call(updateUserApi, data),
                timeout: call(delay , 5000)
            })
            if (!timeout) yield put(editUserSuccess(result))
            else yield put(editUserFailure("Timeout"))
        } catch(err) {
            yield put(editUserFailure(err.message))
        }
    }
}

export default function * root () {
    yield fork(getListAllUser)
    yield fork(deleteUser)
    yield fork(getUserById)
    yield fork(updateUser)
}