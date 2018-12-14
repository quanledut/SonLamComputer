import {fork,all,takeLatest,call} from 'redux-saga/effects'
import {watchRequestLogin} from './LoginSaga'
import {watchGetDevice} from './DeviceSaga'
import * as DeviceActionType from '../actions/DeviceActionType'

export default function* RootSagas(){
    yield all([
        fork(watchRequestLogin),
        fork(watchGetDevice) 
    // yield call(watchGetDevice)
    ])
}