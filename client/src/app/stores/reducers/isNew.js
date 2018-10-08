import {CONSTANTS as UESR_CONSTANTS } from '../../actions/usermanager'

var initialState = false;

var myReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case UESR_CONSTANTS.IS_ADD:
        return true;

        case UESR_CONSTANTS.IS_EDIT:
        return false;

        default: return state;
    }
}

export default myReducer;