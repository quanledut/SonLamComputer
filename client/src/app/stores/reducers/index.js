import { combineReducers } from "redux"
import auth from './authReducer'
import usermanager from './userReducer/listUser'
import searchUser from './userReducer/searchUser'
import roles from './roleReducer/index'
import searchRole from './roleReducer/search'
import deviceTypes from './deviceTypeReducer/index'
import searchDeviceType from './deviceTypeReducer/search'
import computerTypes from './computerTypeReducer/index'
import searchComputerType from './computerTypeReducer/search'
import computerNames from './computerNameReducer/index'
import searchComputerName from './computerNameReducer/search'

export default combineReducers({
    auth,
    usermanager,
    searchUser,
    roles,
    searchRole,
    deviceTypes,
    searchDeviceType,
    computerTypes,
    searchComputerType,
    computerNames,
    searchComputerName,
});
