import { combineReducers } from "redux"
import auth from './authReducer'
import usermanager from './userReducer/listUser'
import searchUser from './userReducer/searchUser'
import ItemEditing from './userReducer/editUser'
import roles from './roleReducer/index'
import searchRole from './roleReducer/search'

export default combineReducers({
    auth,
    usermanager,
    searchUser,
    ItemEditing,
    roles,
    searchRole
});
