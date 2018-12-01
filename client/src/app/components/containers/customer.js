import { connect } from 'react-redux'
import CustomerFormUI from '../ui/Customers/CustomerForm'
import CustomerUI from '../ui/Customers/Customer'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as Actions from '../../actions/customer'
import PopUpSaleOrder from '../ui/utils/PopUpSaleOrder'

export const CustomerForm = connect(
    null, 
    dispatch => ({
        create(user, cb) {
            dispatch(Actions.createRequest(user, cb));
        },
        update(user, cb) {
            dispatch(Actions.updateRequest(user, cb));
        },
        changeActive(ps, cb) {
            dispatch(Actions.changeActiveRequest(ps, cb));
        },
        getById(id, cb) {
            dispatch(Actions.findByIdRequest(id, cb));
        }
    })
)(CustomerFormUI);

export const Customers = connect(
    state => { 
        return {
            todos: state.customers, 
            keyword: state.searchCustomers    
        }
    }, 
    dispatch => ({
        findAll : (cb) => {
            dispatch(Actions.findAllRequest(cb))
        }
    })
)(CustomerUI);

export const SearchFrom = connect(
    null,
    dispatch => ({
        onSearch : (keyword) => {
            dispatch(Actions.searchRequest(keyword));
        }
    })
)(Search);

export const SaleOrder = connect(
    null,
    dispatch => ({
        onSearch : (keyword) => {
            dispatch(Actions.searchRequest(keyword));
        }
    })
)(PopUpSaleOrder);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(Actions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);