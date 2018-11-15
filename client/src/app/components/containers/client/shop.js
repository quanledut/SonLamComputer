import { connect } from 'react-redux'
import {Shop } from '../../ui/PageUsers'
import * as deviceNameActions from '../../../actions/deviceName'
import * as computerNameActions from '../../../actions/computerName'
import * as accessoryActions from '../../../actions/accessoryName'

export const Shops = connect(
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
)(Shop)