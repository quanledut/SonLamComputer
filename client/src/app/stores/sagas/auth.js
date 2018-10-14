import { delay } from 'redux-saga'
import {take, call, put, fork, race} from 'redux-saga/effects'
import {CONSTANTS as AUTH_CONSTANTS } from '../../actions/auth'

import { loginRequestBegin, loginRequestSuccess, loginRequestFailure } from '../../actions/auth'

import { loginApi } from '../../api/auth'


export function * loginFlow() {
    while (true) {
        //Looking for login request
        const request = yield take(AUTH_CONSTANTS.LOGIN_REQUEST)
        console.log(request)
        const {username, password} = request.data
        try {
            let result = yield call(loginApi, username, password)
            request.cb(result, null)
            yield put(loginRequestSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export default function * root () {
    yield fork(loginFlow)
}