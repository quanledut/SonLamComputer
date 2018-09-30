import {combineReducers} from 'redux';
import usermanager from './users/usermanager';
import ItemEditing from './users/itemEditing';
import isNewUser from './users/isNewUser';
import SearchUser from './users/SearchUser';
import RoleGroup from './roles/index';
import SearchRole from './roles/SearchRole';

const myReducer = combineReducers({
    usermanager,
    ItemEditing,
    isNewUser,
    SearchUser,
    RoleGroup,
    SearchRole
});
export default myReducer;