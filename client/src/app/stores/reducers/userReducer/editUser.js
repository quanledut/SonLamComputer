import { CONSTANTS as USER_CONSTANTS } from '../../../actions/usermanager'

var initialState = {};

var myReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case USER_CONSTANTS.GET_USER_BY_ID_REQUEST_SUCCESS:
            return action.data;
    
        default: return state;
    }
}

export default myReducer;