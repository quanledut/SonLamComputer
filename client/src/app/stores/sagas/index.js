import authSaga from './auth'
import {all, call} from 'redux-saga/effects'
import usermanagerSaga from './usermanager'

export default function * root() {
    yield all([
        call(authSaga),
        call(usermanagerSaga)
    ])
}