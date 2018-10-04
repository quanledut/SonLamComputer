import { delay } from 'redux-saga'
import {take, call, put, fork, race} from 'redux-saga/effects'
import {CONSTANTS as AUTH_CONSTANTS } from '../../actions/auth'

import { loginRequestBegin, loginRequestSuccess, loginRequestFailure } from '../../actions/auth'

import { loginApi } from '../../api/auth'


export function * loginFlow() {
    while (true) {
        //Looking for login request
        const request = yield take(AUTH_CONSTANTS.LOGIN_REQUEST)
        const {username, password} = request.data
        yield put(loginRequestBegin())
        try {
            let {result, timeout} = yield race({
                result: call(loginApi, username, password),
                timeout: call(delay , 5000)
            })
            if (!timeout) yield put(loginRequestSuccess(result))
            else yield put(loginRequestFailure("Timeout"))
        } catch(err) {
            yield put(loginRequestFailure(err.message))
        }
    }
}

export default function * root () {
    yield fork(loginFlow)
}