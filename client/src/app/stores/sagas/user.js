import {take, call, put, fork} from 'redux-saga/effects'

import * as userActions from '../../actions/user'

import * as userApi from '../../api/usermanager'

export function * findAll() {
    while (true) {
        const request = yield take(userActions.CONSTANTS.FIND_ALL_REQUEST)
        try {
            let result = yield call(userApi.findAllApi)
            request.cb(result, null)
            yield put(userActions.findALlSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * deleted() {
    while (true) {
        const request = yield take(userActions.CONSTANTS.DELETE_REQUEST)
        const id = request.id
        try {
            let result = yield call(userApi.deleteApi, id)
            request.cb(result, null)
            yield put(userActions.deleteRequestSuccess(id))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * add() {
    while (true) {
        const request = yield take(userActions.CONSTANTS.CREATE_REQUEST)
        try {
            let result = yield call(userApi.addApi, request.data)
            request.cb(result, null)
            yield put(userActions.createRequestSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * findById() {
    while (true) {
        const request = yield take(userActions.CONSTANTS.FIND_BY_ID_REQUEST)
        const id = request.id
        try {
            let result = yield call(userApi.findByIdApi, id)
            request.cb(result, null)
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * updated() {
    while (true) {
        const request = yield take(userActions.CONSTANTS.UPDATE_REQUEST)
        const data = request.data
        try {
            let result = yield call(userApi.updateApi, data)
            request.cb(result, null)
            yield put(userActions.updateRequestSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * changePassword() {
    while (true) {
        const request = yield take(userActions.CONSTANTS.CHANGE_PASSWORD_REQUEST)
        const data = request.data
        try {
            let result = yield call(userApi.changePasswordApi, data)
            request.cb(result, null)
            yield put(userActions.changePasswordRequestSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export default function * root () {
    yield fork(findAll)
    yield fork(add)
    yield fork(deleted)
    yield fork(findById)
    yield fork(updated)
    yield fork(changePassword)
}