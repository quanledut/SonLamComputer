import * as LoginActionType from '../actions/LoginActionType'
import {put, takeLatest} from 'redux-saga/effects'
import {API} from './API' 
import {AsyncStorage} from 'react-native'

function* postLogin(actions) {
    try{
        const response = yield API.postLogin(actions.username,actions.password)
        if(response.status == 200){
            put({
                type: LoginActionType.LOGIN_SUCCESS,
                token: response.token
            })
        }
        if(response.status == 401){
            put({
                type: LoginActionType.LOGIN_FAILED,
                msg: response.msg,
                err: response.detail.message
            })
        }
    }
    catch(err){

    }
}

function* checkLogin() {
    const token = yield AsyncStorage.getItem('token')
    if(token){
        yield put({type: LoginActionType.IS_LOGGED_IN, token: token})
    }
    else{
        yield put({type: LoginActionType.IS_NOT_LOGGED_IN})
    }
}

export function* watchCheckLogin(){
    yield takeLatest(LoginActionType.CHECK_LOGIN,checkLogin)
}

export function* watchRequestLogin(){
    yield takeLatest(LoginActionType.REQUEST_LOGIN, postLogin)
}