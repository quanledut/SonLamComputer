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
        create(data, cb) {
            dispatch(nameActions.createRequest(data, cb));
        },
        update(data, cb) {
            dispatch(nameActions.updateRequest(data, cb));
        },
        getById(id, cb) {
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
        findAll : (cb) => {
            dispatch(nameActions.findAllRequest(cb))
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