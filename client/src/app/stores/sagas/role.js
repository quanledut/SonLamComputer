import {take, call, put, fork} from 'redux-saga/effects'

import * as roleActions from '../../actions/role'
import * as roleApi from '../../api/role'

export function * findCollections() {
    while (true) {
        const request = yield take(roleActions.CONSTANTS.FIND_COLLECTIONS_REQUEST)
        try {
            let result = yield call(roleApi.findCollectionNames)
            request.cb(result, null)
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

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
        const id = request.data
        try {
            let result = yield call(roleApi.deleteApi, id)
            console.log(result)
            request.cb(result, null)
            yield put(roleActions.deleteRequestSuccess({_id: id}))
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
            console.log(err)
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
            console.log(data)
            let result = yield call(roleApi.updateApi, data)
            request.cb(result, null)
            yield put(roleActions.updateRequestSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export default function * root () {
    yield fork(add)
    yield fork(findCollections)
    yield fork(findAll)
    yield fork(deleted)
    yield fork(findById)
    yield fork(updated)
}