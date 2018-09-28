import * as types from './../constants/ActionType';

var initialState = false;

var myReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case types.IS_ADD_USER:
        return true;

        case types.IS_EDIT_USER:
        return false;

        default: return state;
    }
}

export default myReducer;