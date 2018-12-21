import {API} from './API'
import NavigationService from '../../navigations/NavigationService'
import {all,takeLatest} from 'redux-saga/effects'
import * as UserActionType from '../actions/UserActionType'
function* getUserById(action){
    console.log('get user by id' + action.userId)
    const response = yield API.getUserById(action.userId)
    console.log('get user by id sucess' + response._bodyInit)
    if(response.status =='200'){
        NavigationService.navigate('UserDetailScreen',{user:JSON.parse(response._bodyInit)})
    }
}

export function* watchGetUserById(){
    yield takeLatest(UserActionType.GET_USER_BY_ID,getUserById)
}