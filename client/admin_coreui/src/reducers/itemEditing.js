import * as types from './../constants/ActionType';
import { toast } from "react-toastify";
import * as notifications from '../constants/Notifications';

var initialState = {};

var myReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case types.EDIT_USER:
            return action.user;

        default: return state;
    }
}

export default myReducer;