import { connect } from 'react-redux'
import UserFormUI from '../ui/UserManager/UserForm'
import UserManager from '../ui/UserManager/UserManager'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as userActions from '../../actions/user'
import * as roleActions from '../../actions/role'

export const UserForm = connect(
    null, 
    dispatch => ({
        findAllRoles(cb) {
            dispatch(roleActions.findAllRequest(cb));
        },
        createUser(user, cb) {
            dispatch(userActions.createRequest(user, cb));
        },
        updateUser(user, cb) {
            dispatch(userActions.updateRequest(user, cb));
        },
        getUserById(id, cb) {
            dispatch(userActions.findByIdRequest(id, cb));
        }
    })
)(UserFormUI);

export const Users = connect(
    state => { 
        return {
            todos: state.usermanager, 
            keyword: state.searchUser    
        }
    }, 
    dispatch => ({
        findAll : () => {
            dispatch(userActions.findAllRequest())
        }
    })
)(UserManager);

export const SearchFrom = connect(
    null,
    dispatch => ({
        onSearch : (keyword) => {
            dispatch(userActions.searchRequest(keyword));
        }
    })
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(userActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);