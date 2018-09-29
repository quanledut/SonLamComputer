import {combineReducers} from 'redux';
import usermanager from './usermanager';
import ItemEditing from './itemEditing';
import isNewUser from './isNewUser';
import SearchUser from './SearchUser';

const myReducer = combineReducers({
    usermanager,
    ItemEditing,
    isNewUser,
    SearchUser
});
export default myReducer;