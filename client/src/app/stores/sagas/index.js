import {all, call} from 'redux-saga/effects'
import userSage from './user'
import authSaga from './auth'
import roleSaga from './role'
export default function * root() {
    yield all([
        call(authSaga),
        call(userSage),
        call(roleSaga)
    ])
}