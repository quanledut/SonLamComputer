import {all, call} from 'redux-saga/effects'
import userSage from './user'
import authSaga from './auth'
import roleSaga from './role'
import serviceTypeSaga from './serviceType'
import deviceTypeSaga from './deviceType'
import computerTypeSaga from './computerType'
import computerNameSaga from './computerName'
export default function * root() {
    yield all([
        call(authSaga),
        call(userSage),
        call(roleSaga),
        call(serviceTypeSaga),
        call(deviceTypeSaga),
        call(computerTypeSaga),
        call(computerNameSaga),
    ])
}