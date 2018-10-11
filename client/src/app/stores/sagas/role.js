import {take, call, put, fork} from 'redux-saga/effects'

import * as roleActions from '../../actions/role'
import * as roleApi from '../../api/role'

export function * findAll() {
    while(true) {
        const request = yield take(roleActions.CONSTANTS.FIND_ALL_REQUEST)
        try {
            let result = yield call(roleApi.findAll)
            request.cb(result, null)
            yield put(roleActions.findALlSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * deleted() {
    while (true) {
        const request = yield take(roleActions.CONSTANTS.DELETE_REQUEST)
        const id = request.id
        try {
            let result = yield call(roleApi.deleteApi, id)
            request.cb(result, null)
            yield put(roleActions.deleteRequestSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * add() {
    while (true) {
        const request = yield take(roleActions.CONSTANTS.CREATE_REQUEST)
        try {
            let result = yield call(roleApi.addApi, request.data)
            request.cb(result, null)
            yield put(roleActions.createRequestSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * findById() {
    while (true) {
        const request = yield take(roleActions.CONSTANTS.FIND_BY_ID_REQUEST)
        const id = request.id
        try {
            let result = yield call(roleApi.findByIdApi, id)
            request.cb(result, null)
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * updated() {
    while (true) {
        const request = yield take(roleActions.CONSTANTS.UPDATE_REQUEST)
        const data = request.data
        try {
            let result = yield call(roleApi.updateApi, data)
            request.cb(result, null)
            yield put(roleActions.updateRequestSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export default function * root () {
    yield fork(findAll)
    yield fork(deleted)
    yield fork(findById)
    yield fork(updated)
}