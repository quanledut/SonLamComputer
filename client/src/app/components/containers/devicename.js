import { connect } from 'react-redux'
import DeviceNameFormUI from '../ui/DeviceManager/Device/DeviceName/DeviceNameForm'
import DeviceNameUI from '../ui/DeviceManager/Device/DeviceName/index'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as deviceNameActions from '../../actions/deviceName'
import * as computerNameActions from '../../actions/computerName'
import * as deviceTypeActions from '../../actions/deviceType'

export const DeviceNameForm = connect(
    null,
    dispatch => ({
        create(deviceName, cb) {
            dispatch(deviceNameActions.createRequest(deviceName, cb));
        },
        update(deviceName, cb) {
            dispatch(deviceNameActions.updateRequest(deviceName, cb));
        },
        getById(id, cb) {
            dispatch(deviceNameActions.findByIdRequest(id, cb));
        },
        getImportById(id, cb) {
            dispatch(deviceNameActions.findImportByIdRequest(id, cb));
        },
        getExportById(id, cb) {
            dispatch(deviceNameActions.findExportByIdRequest(id, cb));
        },
        findAllComputerName(query, cb){
            dispatch(computerNameActions.findAllRequest(query, cb));
        },
        findAlldeviceType(query, cb){
            dispatch(deviceTypeActions.findAllRequest(query, cb));
        },
        findAlldevices(query, cb){
            dispatch(deviceNameActions.findAllRequest(query, cb));
        }
    })
)(DeviceNameFormUI);

export const DeviceNames = connect(
    state => {
        return {
            todos: state.devices,
            keyword: state.searchDevices
        }
    },
    dispatch => ({
        findAll(query, cb) {
            dispatch(deviceNameActions.findAllRequest(query, cb));
        }
    })
)(DeviceNameUI);

export const SearchFrom = connect(
    null,
    null
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(deviceNameActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);