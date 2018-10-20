import { connect } from 'react-redux'
import ServiceFormUI from '../ui/ServiceManager/services/ServiceForm'
import ServiceUI from '../ui/ServiceManager/services/index'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as deviceNameActions from '../../actions/deviceName'
import * as userActions from '../../actions/user'
import * as serviceTypeActions from '../../actions/serviceType'
import * as serviceActions from '../../actions/services'

export const ServiceForm = connect(
    null, 
    dispatch => ({
        create(serviceName, cb) {
            dispatch(serviceActions.createRequest(serviceName, cb));
        },
        update(serviceName, cb) {
            dispatch(serviceActions.updateRequest(serviceName, cb));
        },
        getById(id, cb) {
            dispatch(serviceActions.findByIdRequest(id, cb));
        },
        findAlldevices(cb){
            dispatch(deviceNameActions.findAllRequest(cb));
        },
        findAllcustomer(cb){
            dispatch(userActions.findAllRequest(cb));
        },
        findAllServiceType(cb){
            dispatch(serviceTypeActions.findAllRequest(cb));
        },
        findCustomerByID(id,cb){
            dispatch(userActions.findByIdRequest(id,cb));
        },
        findDeviceByID(id,cb){
            dispatch(deviceNameActions.findByIdRequest(id,cb));
        }
    })
)(ServiceFormUI);

export const Services = connect(
    state => { 
        console.log(state);
        return {
            todos: state.services, 
            keyword: state.searchServices 
        }
    },
    dispatch => ({
        findAll(cb) {
            dispatch(serviceActions.findAllRequest(cb));
        }
    })
)(ServiceUI);

export const SearchFrom = connect(
    null,
    dispatch => ({
        onSearch(keyword) {
            dispatch(serviceActions.searchRequest(keyword));
        }
    })
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(serviceActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);