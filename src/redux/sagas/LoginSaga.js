import * as LoginActionType from '../actions/LoginActionType'
import {put, takeLatest} from 'redux-saga/effects'
import {API} from './API' 
import {AsyncStorage} from 'react-native'
import NavigationService from '../../navigations/NavigationService'

function* postLogin(actions) {
    try{
        const response = yield API.postLogin(actions.username,actions.password, actions.remember)
        if(response.status == '200'){
            if (actions.remember) AsyncStorage.setItem('token',JSON.parse(response._bodyInit).token)
            put({
                type: LoginActionType.LOGIN_SUCCESS,
                token: response.token
            })
            NavigationService.navigate('ChartScreen')
        }
        if(response.status == 401){
            put({
                type: LoginActionType.LOGIN_FAILED,
                msg: response.msg,
                err: response.detail.message
            })
            console.log('Login failed')
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