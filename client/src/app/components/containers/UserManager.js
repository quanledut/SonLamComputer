import { connect } from 'react-redux'
import UserFormUI from '../ui/UserManager/UserForm'
import * as actions from '../../actions/usermanager'

export const UserForm = connect(
    null, 
    dispatch => ({
        createUser(user, cb) {
            dispatch(actions.createUserRequest(user, cb));
        },
        updateUser(user, cb) {
            dispatch(actions.updateUserRequest(user, cb));
        },
        getUserById(id, cb) {
            dispatch(actions.getUserByIdRequest(id, cb));
        }
    })
)(UserFormUI);

