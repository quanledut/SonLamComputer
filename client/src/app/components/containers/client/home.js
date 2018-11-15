import { connect } from 'react-redux'
import { ClientHome} from '../../ui/PageUsers'
import ProductItems from '../../ui/PageUsers/homePage/ProductItems'
import * as deviceNameActions from '../../../actions/deviceName'
import * as computerNameActions from '../../../actions/computerName'
import * as accessoryActions from '../../../actions/accessoryName'

export const Home = connect(
    null, null
)(ClientHome)

export const ProductItemUI = connect(
    null, 
    dispatch => ({
        findAllLaptop(query, cb){
            dispatch(computerNameActions.findAllRequest(query, cb));
        },
        findAllHarware(query, cb){
            dispatch(deviceNameActions.findAllRequest(query, cb));
        },
        findAllAccessories(query, cb){
            dispatch(accessoryActions.findAllRequest(query, cb));
        }
    })
)(ProductItems)