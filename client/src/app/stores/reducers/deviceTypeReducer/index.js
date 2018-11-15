import { CONSTANTS} from '../../../actions/deviceType'
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
            state = action.data.docs;
            return [...state]
        }

        case CONSTANTS.CREATE_REQUEST_SUCCESS: {
            toast.success(notifications.SAVE_SUCCESS);
            state.push(action.data);
            return [...state]
        }

        case CONSTANTS.DELETE_REQUEST_SUCCESS: {
            var id = action.data;
            console.log(id)
            if(id)
            {
                var indexx = findIndex(state, id);
                state.splice(indexx,1);
            }
            toast.success(notifications.SUCCESS_DELETE);
            return [...state]
        }

        case CONSTANTS.UPDATE_REQUEST_SUCCESS: {
            id = action.data._id;
            if(id)
            {
                indexx = findIndex(state, id);
                state[indexx] = action.data;
            }
            toast.success(notifications.SAVE_SUCCESS);
            return [...state]
        }

        default:
            return state
    }
}

export default reducer