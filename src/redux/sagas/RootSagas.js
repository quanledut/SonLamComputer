import {fork,all,takeLatest,call} from 'redux-saga/effects'
import {watchRequestLogin} from './LoginSaga'
import {watchGetDevice, watchGetMoreDevice, watchGetDeviceByID} from './DeviceSaga'
import {watchGetDeviceType} from './DeviceTypeSaga'
import {watchGetServiceSell,watchGetServiceFix} from './ServiceSaga'
import {watchGetUserById} from './UserSaga'


export default function* RootSagas(){
    yield all([
        fork(watchRequestLogin),
        fork(watchGetDevice), 
        fork(watchGetDeviceType),
        fork(watchGetServiceSell),
        fork(watchGetServiceFix),
        fork(watchGetMoreDevice),
        fork(watchGetDeviceByID),
        fork(watchGetUserById)
    ])
}