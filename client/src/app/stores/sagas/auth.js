import {take, call, put, fork} from 'redux-saga/effects'
import {CONSTANTS as AUTH_CONSTANTS } from '../../actions/auth'

import {loginRequestSuccess, registerRequestSuccess} from '../../actions/auth'

import { loginApi, registerApi } from '../../api/auth'


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

export function * registerFlow() {
    while (true) {
        //Looking for register request
        const request = yield take(AUTH_CONSTANTS.REGISTER_REQUEST)
        console.log(request)
        const {username, fullname,  email, password} = request.data
        try {
            let result = yield call(registerApi, username, fullname, email, password)
            request.cb(result, null)
            yield put(registerRequestSuccess(result))
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export default function * root () {
    yield fork(loginFlow)
    yield fork(registerFlow)
}