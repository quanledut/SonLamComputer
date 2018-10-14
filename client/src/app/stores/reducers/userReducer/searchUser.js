import { CONSTANTS as USER_CONSTANTS } from '../../../actions/user'

var initialState = '';

var myReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case USER_CONSTANTS.SEARCH_REQUEST:
            return action.keyword;
        
        default: return state;
    }
}

export default myReducer;