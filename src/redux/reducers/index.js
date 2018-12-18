import LoginReducer from './LoginReducer'
import DeviceReducer from './DeviceReducer'
import DeviceTypeReducer from './DeviceTypeReducer'
import {combineReducers} from 'redux'

export default RootReducer = combineReducers({
        LoginReducer,
        DeviceReducer,
        DeviceTypeReducer
    })