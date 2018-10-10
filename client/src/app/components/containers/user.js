import { connect } from 'react-redux'
import UserFormUI from '../ui/UserManager/UserForm'
import * as userActions from '../../actions/user'
import * as roleActions from '../../actions/role'

export const UserForm = connect(
    null, 
    dispatch => ({
        findAllRoles(cb) {
            dispatch(roleActions.findAllRequet(cb));
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

