import {fork} from 'redux-saga/effects'
import {watchRequestLogin} from './LoginSaga'

export default function* RootSagas(){
    yield [
        fork(watchRequestLogin)
    ]
}