import * as type from './../constants/ActionType';

export const list_all_usre = () =>{
    return {
        type: type.GET_ALL_USER
    }
}

export const save_user = (user) =>{
    return {
        type: type.SAVE_USER,
        user
    }
}

export const edit_user = (user) =>{
    return {
        type: type.EDIT_USER,
        user
    }
}

export const is_add_user = () =>{
    return {
        type: type.IS_ADD_USER     
    }
}

export const is_edit_user = () =>{
    return {
        type: type.IS_EDIT_USER     
    }
}

export const delete_user = (nf_id) =>{
    return {
        type: type.DELETE_USER,
        nf_id
    }
}

export const search_user = (keyword) =>{
    return {
        type: type.SEARCH_USER,
        keyword
    }
}