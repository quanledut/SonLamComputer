import LoginReducer from './LoginReducer'
import {combineReducers} from 'redux'
export function addNavToReducer(navReducer){
    return combineReducers({
        LoginReducer,
        navReducer
    })
}