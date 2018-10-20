import { CONSTANTS} from '../../../actions/payment'
import { toast } from "react-toastify";
import * as notifications from '../../../constants/Notifications';

let initialState = []

var findIndex = (users, id) =>
{
    var result = -1;
    users.forEach((user,index)=>{
        if(user._id === id)
        {
            result = index;
        }
    });
    return result;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case CONSTANTS.FIND_ALL_REQUEST_SUCCESS: {
            state = action.data;
            return [...state]
        }

        case CONSTANTS.UPDATE_REQUEST_SUCCESS: {
            var id = action.data._id;
            if(id)
            {
                var indexx = findIndex(state, id);
                state[indexx] = action.data;
            }
            toast.success(notifications.ACCEPT_SUCCESS);
            return [...state]
        }

        default:
            return state
    }
}

export default reducer