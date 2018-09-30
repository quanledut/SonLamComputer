import * as types from './../../constants/ActionType';
import { toast } from "react-toastify";
import * as notifications from '../../constants/Notifications';

var data = JSON.parse(localStorage.getItem('roles'));
var initialState = data ? data : [];

var randomID = () =>
{
        var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
        case types.GET_ALL_ROLE:
        return state;

        case types.SAVE_ROLE:
            var newrole = {
                nf_id : action.role.nf_id,
                nf_grouprole :action.role.nf_grouprole,
                date_input: action.role.date_input,
                textarea_input :action.role.textarea_input,
                select: action.role.select,
            };
            if(!newrole.nf_id)
            {
                newrole.nf_id = randomID();
                state.push(newrole);
                toast.success(notifications.SUCCESS_NEW);
            }else
            {
                var indexx = findIndex(state, newrole.nf_id);
                state[indexx] = newrole;
                toast.success(notifications.SUCCESS_EDIT);
            }
            localStorage.setItem('roles',JSON.stringify(state));
            
            return [...state];
        
        case types.DELETE_ROLE:
            var id = action.nf_id;
            if(id)
            {
                indexx = findIndex(state, id);
                state.splice(indexx,1);
                localStorage.setItem('users',JSON.stringify(state));
            }
            toast.success(notifications.SUCCESS_DELETE);
            return [...state];

        default: return state;
    }
}

export default myReducer;