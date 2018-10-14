import { connect } from 'react-redux'
import RoleFormUI from '../ui/RoleManager/RoleForm'
import RoleManager from '../ui/RoleManager/Role'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as roleActions from '../../actions/role'

export const RoleForm = connect(
    null, 
    dispatch => ({
        create(role, cb) {
            dispatch(roleActions.createRequest(role, cb));
        },
        update(role, cb) {
            dispatch(roleActions.updateRequest(role, cb));
        },
        findCollectionNames(cb) {
            dispatch(roleActions.findCollectionRequest(cb))
        },
        findById(id, cb) {
            dispatch(roleActions.findByIdRequest(id, cb));
        }
    })
)(RoleFormUI);

export const Roles = connect(
    state => { 
        console.log(state);
        return {
            todos: state.roles, 
            keyword: state.searchRole    
        }
    },
    dispatch => ({
        findAllRole(cb) {
            dispatch(roleActions.findAllRequest(cb));
        },
        delete(data, cb) {
            dispatch(roleActions.deleteRequest(data, cb))
        },
    })
)(RoleManager);

export const SearchFrom = connect(
    null,
    dispatch => ({
        onSearch(keyword) {
            dispatch(roleActions.searchRequest(keyword));
        }
    })
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(roleActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);