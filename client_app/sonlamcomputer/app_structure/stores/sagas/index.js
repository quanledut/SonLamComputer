import {all, call} from 'redux-saga/effects'
import authSaga from './auth'

export default function * root() {
    yield all([
        call(authSaga),
    ])
}