import {API} from './API'
import {takeLatest, put} from 'redux-saga/effects'
import * as DeviceTypeActionType from '../actions/DeviceTypeActionType'

function* getDeviceType(action){
    try{
        const response = yield API.getDeviceType(action.token)
        if(response.status == '200'){
            //yield console.log('get device type saga success: '+ response._bodyInit)
            yield put(
                {
                    type: DeviceTypeActionType.GET_DEVICE_TYPE_SUCCESS, 
                    deviceType: JSON.parse(response._bodyInit)
                })
        }
        else yield put ({type: DeviceTypeActionType.GET_DEVICE_TYPE_FAILED})
    }
    catch(err){

    }
    
}

export function* watchGetDeviceType(){
    yield takeLatest(DeviceTypeActionType.GET_DEVICE_TYPE,getDeviceType)
}

