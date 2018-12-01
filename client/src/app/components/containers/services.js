import { connect } from 'react-redux'
import ServiceFormUI from '../ui/ServiceManager/services/ServiceForm'
import ServiceUI from '../ui/ServiceManager/services/index'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as deviceNameActions from '../../actions/deviceName'
import * as userActions from '../../actions/user'
import * as serviceTypeActions from '../../actions/serviceType'
import * as serviceActions from '../../actions/services'
import * as accessoryNameActions from '../../actions/accessoryName'
import * as computerNameActions from '../../actions/computerName'
import * as accessoryTypeActions from '../../actions/accessoryType'
import * as deviceTypeActions from '../../actions/deviceType'
import * as computerTypeActions from '../../actions/computerType'
import PopUpCustomerFormUI from '../ui/utils/popUpCustomer'
import * as customerActions from '../../actions/customer'

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
        findAllDevices(query, cb){
            dispatch(deviceNameActions.findAllRequest(query, cb));
        },
        findAllaccessories(query, cb){
            dispatch(accessoryNameActions.findAllRequest(query, cb));
        },
        findAllComputertype(query, cb) {
            dispatch(computerTypeActions.findAllRequest(query, cb))
        },
        findAllComputername(query, cb) {
            dispatch(computerNameActions.findAllRequest(query, cb))
        },
        findAllAccessoryTypes(query, cb) {
            dispatch(accessoryTypeActions.findAllRequest(query, cb));
        },
        findAllDeviceTypes(query, cb) {
            dispatch(deviceTypeActions.findAllRequest(query, cb))
        },
        findAllcustomer(cb){
            dispatch(userActions.findAllRequest(cb));
        },
        findAllServiceType(query, cb){
            dispatch(serviceTypeActions.findAllRequest(query, cb));
        },
        findCustomerByID(id,cb){
            dispatch(userActions.findByIdRequest(id,cb));
        },
        findDeviceByID(id,cb){
            dispatch(deviceNameActions.findByIdRequest(id,cb));
        },
        findAccessoryById(id, cb) {
            dispatch(accessoryNameActions.findByIdRequest(id,cb))
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
        findAll(query, cb) {
            dispatch(serviceActions.findAllRequest(query, cb));
        }
    })
)(ServiceUI);

export const SearchFrom = connect(
    null,
    null
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(serviceActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);

export const CustomerFormUI = connect(
    null,
    dispatch => ({
        createUser(user, cb) {
            dispatch(customerActions.createRequest(user, cb));
        },
    })
)(PopUpCustomerFormUI);