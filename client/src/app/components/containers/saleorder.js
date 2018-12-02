import { connect } from 'react-redux'
import SaleOrderFormUI from '../ui/SaleOrderManager/SaleOrderForm'
import SaleOrderUI from '../ui/SaleOrderManager/index'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as deviceNameActions from '../../actions/deviceName'
import * as saleorderActions from '../../actions/saleorder'
import * as accessoryNameActions from '../../actions/accessoryName'
import * as computerNameActions from '../../actions/computerName'
import * as accessoryTypeActions from '../../actions/accessoryType'
import * as deviceTypeActions from '../../actions/deviceType'
import * as computerTypeActions from '../../actions/computerType'
import PopUpCustomerFormUI from '../ui/utils/popUpCustomer'
import * as customerActions from '../../actions/customer'

export const SaleOrderForm = connect(
    null, 
    dispatch => ({
        create(serviceName, cb) {
            dispatch(saleorderActions.createRequest(serviceName, cb));
        },
        update(serviceName, cb) {
            dispatch(saleorderActions.updateRequest(serviceName, cb));
        },
        getById(id, cb) {
            dispatch(saleorderActions.findByIdRequest(id, cb));
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
            dispatch(customerActions.findAllRequest(cb));
        },
        findCustomerByID(id,cb){
            dispatch(customerActions.findByIdRequest(id,cb));
        },
        findDeviceByID(id,cb){
            dispatch(deviceNameActions.findByIdRequest(id,cb));
        },
        findAccessoryById(id, cb) {
            dispatch(accessoryNameActions.findByIdRequest(id,cb))
        }
    })
)(SaleOrderFormUI);

export const SaleOrders = connect(
    state => { 
        console.log(state);
        return {
            todos: state.saleorders, 
            keyword: state.searchSaleorders 
        }
    },
    dispatch => ({
        findAll(query, cb) {
            dispatch(saleorderActions.findAllRequest(query, cb));
        }
    })
)(SaleOrderUI);

export const SearchFrom = connect(
    null,
    null
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(saleorderActions.deleteRequest(id, cb));
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