import { connect } from 'react-redux'
import DeviceNameFormUI from '../ui/DeviceManager/Device/DeviceName/DeviceNameForm'
import DeviceNameUI from '../ui/DeviceManager/Device/DeviceName/index'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as deviceNameActions from '../../actions/deviceName'
import * as computerNameActions from '../../actions/computerName'
import * as deviceTypeActions from '../../actions/deviceType'
import * as serviceTypeActions from '../../actions/serviceType'

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
        findAllComputerName(cb){
            dispatch(computerNameActions.findAllRequest(cb));
        },
        findAlldeviceType(cb){
            dispatch(deviceTypeActions.findAllRequest(cb));
        },
        findAllServiceType(cb){
            dispatch(serviceTypeActions.findAllRequest(cb));
        }
    })
)(DeviceNameFormUI);

export const DeviceNames = connect(
    state => { 
        console.log(state);
        return {
            todos: state.devices, 
            keyword: state.searchDevices 
        }
    },
    dispatch => ({
        findAll(cb) {
            dispatch(deviceNameActions.findAllRequest(cb));
        }
    })
)(DeviceNameUI);

export const SearchFrom = connect(
    null,
    dispatch => ({
        onSearch(keyword) {
            dispatch(deviceNameActions.searchRequest(keyword));
        }
    })
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(deviceNameActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);