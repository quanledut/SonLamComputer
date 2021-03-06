import { connect } from 'react-redux'
import ComputerTypeFormUI from '../ui/DeviceManager/Computer/ComputerType/ComputerTypeForm'
import ComputerTypeUI from '../ui/DeviceManager/Computer/ComputerType/index'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as computerTypeActions from '../../actions/computerType'

export const ComputerTypeForm = connect(
    null, 
    dispatch => ({
        create(role, cb) {
            dispatch(computerTypeActions.createRequest(role, cb));
        },
        update(role, cb) {
            dispatch(computerTypeActions.updateRequest(role, cb));
        },
        getById(id, cb) {
            dispatch(computerTypeActions.findByIdRequest(id, cb));
        }
    })
)(ComputerTypeFormUI);

export const ComputerType = connect(
    state => { 
        return {
            todos: state.computerTypes, 
            keyword: state.searchComputerType    
        }
    },
    dispatch => ({
        findAll(query, cb) {
            dispatch(computerTypeActions.findAllRequest(query, cb));
        }
    })
)(ComputerTypeUI);

export const SearchFrom = connect(
    null,
    null
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(computerTypeActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);