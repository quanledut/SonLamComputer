import {all, call} from 'redux-saga/effects'
import userSage from './user'
import authSaga from './auth'
import roleSaga from './role'
import serviceTypeSaga from './serviceType'
import deviceTypeSaga from './deviceType'
import computerTypeSaga from './computerType'
import computerNameSaga from './computerName'
import devicesSaga from './devices'
import serviceSaga from './service'
import paymentSaga from './payment'
import accessorysSaga from './accessory';
import accessoryTypeSaga from './accessoryType';
import customerSaga from './customer';

export default function * root() {
    yield all([
        call(authSaga),
        call(userSage),
        call(roleSaga),
        call(serviceTypeSaga),
        call(deviceTypeSaga),
        call(computerTypeSaga),
        call(computerNameSaga),
        call(devicesSaga),
        call(serviceSaga),
        call(paymentSaga),
        call(accessorysSaga),
        call(accessoryTypeSaga),
        call(customerSaga),
    ])
}