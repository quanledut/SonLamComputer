import { CONSTANTS } from '../../../actions/deviceName'

var initialState = '';

var myReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case CONSTANTS.SEARCH_REQUEST:
            return action.keyword;
        
        default: return state;
    }
}

export default myReducer;