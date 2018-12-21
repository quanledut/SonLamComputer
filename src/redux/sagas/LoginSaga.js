import * as LoginActionType from '../actions/LoginActionType'
import {put, takeLatest} from 'redux-saga/effects'
import {API} from './API' 
import {AsyncStorage} from 'react-native'
import NavigationService from '../../navigations/NavigationService'

function* postLogin(action) {
    try{
        const response = yield API.postLogin(action.username,action.password, action.remember)
        if(response.status == '200'){
            token = yield JSON.parse(response._bodyInit).token
            if (action.remember) yield AsyncStorage.setItem('token',token)
            yield put({
                type: LoginActionType.LOGIN_SUCCESS,
                token: response.token
            })
            yield NavigationService.showNavigator()
            yield NavigationService.navigate('HomeScreen',token)
        }
        else {
            yield put({
                type: LoginActionType.LOGIN_FAILED,
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