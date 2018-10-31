import { connect } from 'react-redux'
import AccessoryTypeFormUI from '../ui/DeviceManager/Accessory/AccessoryType/AccessoryTypeForm'
import AccessoryType from '../ui/DeviceManager/Accessory/AccessoryType'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as accessoryTypeActions from '../../actions/accessoryType'

export const AccessoryTypeForm = connect(
    null, 
    dispatch => ({
        create(accessoryType, cb) {
            dispatch(accessoryTypeActions.createRequest(accessoryType, cb));
        },
        update(accessoryType, cb) {
            dispatch(accessoryTypeActions.updateRequest(accessoryType, cb));
        },
        getById(id, cb) {
            dispatch(accessoryTypeActions.findByIdRequest(id, cb));
        }
    })
)(AccessoryTypeFormUI);

export const AccessoryTypes = connect(
    state => { 
        return {
            todos: state.accessoryTypes, 
            keyword: state.searchAccessoryType    
        }
    },
    dispatch => ({
        findAll(query, cb) {
            dispatch(accessoryTypeActions.findAllRequest(query, cb));
        }
    })
)(AccessoryType);

export const SearchFrom = connect(
    null,
    null
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(accessoryTypeActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);