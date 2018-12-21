import * as DeviceActionType from '../actions/DeviceActionType'
import * as DeviceAction from '../actions/DeviceAction'
import {put, takeLatest, call} from 'redux-saga/effects'
import {API} from './API' 
import NavigationService from '../../navigations/NavigationService'

function* getDevice(action){
    try{
    const response = yield API.getDevices(action.token, action.deviceType, action.page);
    if(response.status == '200'){
        yield put({
            type: DeviceActionType.GET_DEVICE_SUCCESS,
            devices: JSON.parse(response._bodyInit)
        })
    }
    else {
        yield put(DeviceAction.getDeviceFailed())
    }
    }
    catch(err){

    }
}

function* getMoreDevice(action){
    try{
        const response = yield API.getDevices(action.token, action.deviceType, action.page);
        if(response.status == '200'){
            yield put({
                type: DeviceActionType.GET_MORE_DEVICE_SUCCESS,
                devices: JSON.parse(response._bodyInit)
            })
        }
        else 
            yield put({
                type: DeviceActionType.GET_MORE_DEVICE_FAILED
            })
        }
    catch(err){

    }
}

function* getDeviceById(action){
    try{
        const response = yield API.getDeviceById(action.deviceId);
        yield console.log('get device by id'+ action.deviceId + '   ' + response._bodyInit)
        if(response.status == '200'){
            yield NavigationService.navigate('ProductDetailScreen',{item:JSON.parse(response._bodyInit)})
        }
        else 
            yield put({
                type: DeviceActionType.GET_DEVICE_BY_ID_FAILED
            })
        }
    catch(err){

    }
}

export function* watchGetDevice(){
    yield takeLatest(DeviceActionType.GET_DEVICE, getDevice)
}

export function* watchGetDeviceByID(){
    yield takeLatest(DeviceActionType.GET_DEVICE_BY_ID, getDeviceById)
}

export function* watchGetMoreDevice(){
    yield takeLatest(DeviceActionType.GET_MORE_DEVICE, getMoreDevice)
}