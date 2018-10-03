import * as types from './../../constants/ActionType';
import { toast } from "react-toastify";
import * as notifications from '../../constants/Notifications';

var data = JSON.parse(localStorage.getItem('services'));
var initialState = data ? data : [];

var randomID = () =>
{
        var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        id = "SV_" + id;
        return id;
}

var findIndex = (users, id) =>
{
    var result = -1;
    users.forEach((user,index)=>{
        if(user.nf_id === id)
        {
            result = index;
        }
    });
    return result;
}

var myReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case types.GET_ALL_SERVICE:
        return state;

        case types.SAVE_SERVICE:
            var newservice = {
                nf_id : action.service.nf_id,
                nf_username :action.service.nf_username,
                select: action.service.select,
            };
            if(!newservice.nf_id)
            {
                newservice.nf_id = randomID();
                state.push(newservice);
                toast.success(notifications.SUCCESS_NEW);
            }else
            {
                var indexx = findIndex(state, newservice.nf_id);
                state[indexx] = newservice;
                toast.success(notifications.SUCCESS_EDIT);
            }
            localStorage.setItem('services',JSON.stringify(state));
            
            return [...state];
        
        case types.DELETE_SERVICE:
            var id = action.nf_id;
            if(id)
            {
                indexx = findIndex(state, id);
                state.splice(indexx,1);
                localStorage.setItem('services',JSON.stringify(state));
            }
            toast.success(notifications.SUCCESS_DELETE);
            return [...state];

        default: return state;
    }
}

export default myReducer;