import { connect } from 'react-redux'
import ComputerNameFormUI from '../ui/DeviceManager/Computer/ComputerName/ComputerNameForm'
import ComputerNameUI from '../ui/DeviceManager/Computer/ComputerName/index'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as nameActions from '../../actions/computerName'
import * as typeActions from '../../actions/computerType'

export const ComputerNameForm = connect(
    null, 
    dispatch => ({
        findAllComputerType(cb) {
            dispatch(typeActions.findAllRequest(cb));
        },
        createUser(data, cb) {
            dispatch(nameActions.createRequest(data, cb));
        },
        updateUser(data, cb) {
            dispatch(nameActions.updateRequest(data, cb));
        },
        getUserById(id, cb) {
            dispatch(nameActions.findByIdRequest(id, cb));
        }
    })
)(ComputerNameFormUI);

export const ComputerName = connect(
    state => { 
        return {
            todos: state.computerNames, 
            keyword: state.searchComputerName    
        }
    }, 
    dispatch => ({
        findAll : () => {
            dispatch(nameActions.findAllRequest())
        }
    })
)(ComputerNameUI);

export const SearchFrom = connect(
    null,
    dispatch => ({
        onSearch : (keyword) => {
            dispatch(nameActions.searchRequest(keyword));
        }
    })
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(nameActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);