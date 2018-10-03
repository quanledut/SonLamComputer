import {combineReducers} from 'redux';
import usermanager from './users/usermanager';
import ItemEditing from './users/itemEditing';
import isNewUser from './users/isNewUser';
import SearchUser from './users/SearchUser';
import RoleGroup from './roles/index';
import SearchRole from './roles/SearchRole';
import ServiceState from './service/index';
import SearchService from './service/SearchService';

const myReducer = combineReducers({
    usermanager,
    ItemEditing,
    isNewUser,
    SearchUser,
    RoleGroup,
    SearchRole,
    ServiceState,
    SearchService
});
export default myReducer;