import { CONSTANTS as CUSTOMER_CONSTANTS } from '../../../actions/customer'

var initialState = '';

var myReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case CUSTOMER_CONSTANTS.SEARCH_REQUEST:
            return action.keyword;
        
        default: return state;
    }
}

export default myReducer;