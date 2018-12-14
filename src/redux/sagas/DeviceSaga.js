import * as DeviceActionType from '../actions/DeviceActionType'
import * as DeviceAction from '../actions/DeviceAction'
import {put, takeLatest, call} from 'redux-saga/effects'
import {API} from './API' 
import {AsyncStorage} from 'react-native'
import NavigationService from '../../navigations/NavigationService'

function* getDevice(action){
    try{
    const response = yield API.getDevices(action.token);
    console.log(response.status)
    if(response.status == '200'){
        yield put({
            type: DeviceActionType.GET_DEVICE_SUCCESS,
            devices: JSON.parse(response._bodyInit)
        })
        // yield dispatch(DeviceAction.getDeviceSucess(JSON.parse(response.body)))
    }
    else {
        yield put(DeviceAction.getDeviceFailed())
    }
    }
    catch(err){

    }
}

export function* watchGetDevice(){
    yield takeLatest(DeviceActionType.GET_DEVICE, getDevice)
}