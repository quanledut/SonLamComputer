import { connect } from 'react-redux'
import ViewCustomerUI from '../ui/ViewCustomers/ViewCustomer'
import * as Actions from '../../actions/customer'
import PopUpSaleOrder from '../ui/utils/PopUpSaleOrder'

export const ViewCustomer = connect(
    state => { 
        return {
            todos: state.customers
        }
    }, 
    dispatch => ({
        getCurrentInfo : (cb) => {
            dispatch(Actions.findCurrentUserInfo(cb))
        },
    })
)(ViewCustomerUI);

export const SaleOrder = connect(
    null,
    dispatch => ({
        onSearch : (keyword) => {
            dispatch(Actions.searchRequest(keyword));
        }
    })
)(PopUpSaleOrder);