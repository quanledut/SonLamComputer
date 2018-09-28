import {combineReducers} from 'redux';
import usermanager from './usermanager';
import ItemEditing from './itemEditing';
import isNewUser from './isNewUser';

const myReducer = combineReducers({
    usermanager,
    ItemEditing,
    isNewUser
});
export default myReducer;