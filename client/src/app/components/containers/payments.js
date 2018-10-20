import { connect } from 'react-redux'
import PaymentFormUI from '../ui/Payments/viewDetails'
import PaymentUI from '../ui/Payments/index'
import Search from '../ui/utils/Search'
import PopUpPayment from '../ui/utils/PopUpPayment'
import * as actions from '../../actions/payment'

export const PaymentForm = connect(
    null, 
    dispatch => ({
        updateStatus(serviceName, cb) {
            dispatch(actions.updateRequest(serviceName, cb));
        },
        getById(id, cb) {
            dispatch(actions.findByIdRequest(id, cb));
        },
    })
)(PaymentFormUI);

export const Payments = connect(
    state => { 
        console.log(state);
        return {
            todos: state.payments, 
            keyword: state.searchPayments 
        }
    },
    dispatch => ({
        findAll(cb) {
            dispatch(actions.findAllRequest(cb));
        }
    })
)(PaymentUI);

export const SearchFrom = connect(
    null,
    dispatch => ({
        onSearch(keyword) {
            dispatch(actions.searchRequest(keyword));
        }
    })
)(Search);

export const AcceptFrom = connect(
    null,
    dispatch => ({
        onAccept : (data, cb) =>{
            dispatch(actions.updateRequest(data, cb));
        }
    })
)(PopUpPayment);