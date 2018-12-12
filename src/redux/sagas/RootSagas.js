import {fork,all} from 'redux-saga/effects'
import {watchRequestLogin} from './LoginSaga'

export default function* RootSagas(){
    yield all ([
        fork(watchRequestLogin),
    ])
}