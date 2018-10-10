import {take, call, put, fork} from 'redux-saga/effects'

import * as roleActions from '../../actions/role'
import * as roleApi from '../../api/role'

export function * findAll() {
    while(true) {
        const request = yield take(roleActions.CONSTANTS.FIND_ALL_REQUEST)
        try {
            let result = yield call(roleApi.findAll)
            request.cb(result, null)
        } catch(err) {
            request.cb(null, err.message)
        }
    }
}

export default function * root () {
    yield fork(findAll)
}