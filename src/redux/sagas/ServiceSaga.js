import {API} from './API'
import * as ServiceActionType from '../actions/ServiceActionType'
import {takeLatest,put,all} from 'redux-saga/effects'

function* getServiceSell(action){
    const response = yield API.getServiceSell(action.token)
    if(response.status == '200'){
        yield put({
            type: ServiceActionType.GET_SERVICE_SELL_SUCCESS,
            serviceSell: JSON.parse(response._bodyInit)
        })
    }
    else {
        yield put({
            type: ServiceActionType.GET_SERVICE_SELL_FAILED
        })
    }
}

function* getServiceFix(action){
    const response = yield API.getServiceFix(action.token)
    console.log('Service Fix saga: ' + response._bodyInit)
    if(response.status == '200'){
        yield put({
            type: ServiceActionType.GET_SERVICE_FIX_SUCCESS,
            serviceFix: JSON.parse(response._bodyInit)
        })
    }
    else {
        yield put({
            type: ServiceActionType.GET_SERVICE_FIX_FAILED
        })
    }
}

export function* watchGetServiceSell(){
    yield takeLatest(ServiceActionType.GET_SERVICE_SELL,getServiceSell)
}

export function* watchGetServiceFix(){
    yield  takeLatest(ServiceActionType.GET_SERVICE_FIX,getServiceFix)
}