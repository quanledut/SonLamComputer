import {all, call} from 'redux-saga/effects'
import authSaga from './auth'
import deviceSaga from './devices'

export default function * root() {
    yield all([
        call(authSaga),
        call(deviceSaga)
    ])
}