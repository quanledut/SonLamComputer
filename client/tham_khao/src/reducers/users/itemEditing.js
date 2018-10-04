import * as types from './../../constants/ActionType';

var initialState = {};

var myReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case types.EDIT_USER:
            return action.user;

        case types.EDIT_ROLE:
            return action.role;

        default: return state;
    }
}

export default myReducer;