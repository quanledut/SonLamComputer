import {take, call, put, fork} from 'redux-saga/effects'

import * as Actions from '../../actions/deviceName'
import * as Api from '../../api/deviceName'

export function * findAll() {
    while(true) {
        const request = yield take(Actions.CONSTANTS.FIND_ALL_REQUEST)
        try {
            // console.log(request)
            let result = yield call(Api.findAll, request.query)

            request.cb(result, null)
            // yield put(Actions.findALlSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * deleted() {
    while (true) {
        const request = yield take(Actions.CONSTANTS.DELETE_REQUEST)
        const id = request.data
        try {
            let result = yield call(Api.deleteApi, id)
            request.cb(result, null)
            yield put(Actions.deleteRequestSuccess(id))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * add() {
    while (true) {
        const request = yield take(Actions.CONSTANTS.CREATE_REQUEST)
        try {
            let result = yield call(Api.addApi, request.data)
            request.cb(result, null)
            yield put(Actions.createRequestSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export function * findById() {
    while (true) {
        const request = yield take(Actions.CONSTANTS.FIND_BY_ID_REQUEST)
        const id = request.id
        try {
            let result = yield call(Api.findByIdApi, id)
            request.cb(result, null)
        } catch(err) {
            console.log(err.message)
            request.cb(null, err.message)
        }
    }
}

export function * updated() {
    while (true) {
        const request = yield take(Actions.CONSTANTS.UPDATE_REQUEST)
        const data = request.data
        try {
            let result = yield call(Api.updateApi, data)
            request.cb(result, null)
            yield put(Actions.updateRequestSuccess(result))
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
}