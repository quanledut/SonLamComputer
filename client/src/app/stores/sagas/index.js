import authSaga from './auth'
import {all, call} from 'redux-saga/effects'

export default function * root() {
    yield all([
        call(authSaga)
    ])
}