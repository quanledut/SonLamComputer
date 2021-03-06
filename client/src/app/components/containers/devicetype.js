import { connect } from 'react-redux'
import DeviceTypeFormUI from '../ui/DeviceManager/Device/DeviceType/DeviceTypeForm'
import DeviceType from '../ui/DeviceManager/Device/DeviceType/index'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as deviceTypeActions from '../../actions/deviceType'

export const DeviceTypeForm = connect(
    null, 
    dispatch => ({
        create(deviceType, cb) {
            dispatch(deviceTypeActions.createRequest(deviceType, cb));
        },
        update(deviceType, cb) {
            dispatch(deviceTypeActions.updateRequest(deviceType, cb));
        },
        getById(id, cb) {
            dispatch(deviceTypeActions.findByIdRequest(id, cb));
        }
    })
)(DeviceTypeFormUI);

export const DeviceTypes = connect(
    state => { 
        return {
            todos: state.deviceTypes, 
            keyword: state.searchDeviceType    
        }
    },
    dispatch => ({
        findAll(query, cb) {
            dispatch(deviceTypeActions.findAllRequest(query, cb));
        }
    })
)(DeviceType);

export const SearchFrom = connect(
    null,
    null
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(deviceTypeActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);