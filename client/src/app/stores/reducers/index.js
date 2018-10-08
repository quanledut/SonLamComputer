import { combineReducers } from "redux"
import auth from './authReducer'
import usermanager from './userReducer/listUser'
import searchUser from './userReducer/searchUser'
import ItemEditing from './userReducer/editUser'

export default combineReducers({
    auth,
    usermanager,
    searchUser,
    ItemEditing
});
