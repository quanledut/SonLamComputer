import * as types from './../constants/ActionType';
import { toast } from "react-toastify";
import * as notifications from '../constants/Notifications';

var data = JSON.parse(localStorage.getItem('users'));
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
        case types.GET_ALL_USER:
        return state;

        case types.SAVE_USER:
            var newuser = {
                nf_id : action.user.nf_id,
                nf_email :action.user.nf_email,
                nf_password: action.user.nf_password,
                nf_username :action.user.nf_username,
                inline_radios : action.user.inline_radios,
                date_input: action.user.date_input,
                textarea_input :action.user.textarea_input,
                select: action.user.select,
            };
            if(!newuser.nf_id)
            {
                newuser.nf_id = randomID();
                state.push(newuser);
                toast.success(notifications.SUCCESS_NEW);
            }else
            {
                var indexx = findIndex(state, newuser.nf_id);
                state[indexx] = newuser;
                toast.success(notifications.SUCCESS_EDIT);
            }
            localStorage.setItem('users',JSON.stringify(state));
            
            return [...state];
        
        case types.DELETE_USER:
            var id = action.nf_id;
            if(id)
            {
                var indexx = findIndex(state, id);
                state.splice(indexx,1);
                localStorage.setItem('users',JSON.stringify(state));
            }
            toast.success(notifications.SUCCESS_DELETE);
            return [...state];

        default: return state;
    }
}

export default myReducer;