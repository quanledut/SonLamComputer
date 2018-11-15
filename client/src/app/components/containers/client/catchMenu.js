import { connect } from 'react-redux'
import CatchMenu from '../../ui/PageUsers/common/catch_menu'

import * as deviceTypeActions from '../../../actions/deviceType'
import * as computerTypeActions from '../../../actions/computerType'
import * as accessoryTypeActions from '../../../actions/accessoryType'

export const CatchMenuUI = connect(
    null, 
    dispatch => ({
        findAllLaptopType(query, cb){
            dispatch(computerTypeActions.findAllRequest(query, cb));
        },
        findAllHarwareType(query, cb){
            dispatch(deviceTypeActions.findAllRequest(query, cb));
        },
        findAllAccessoriesType(query, cb){
            dispatch(accessoryTypeActions.findAllRequest(query, cb));
        }
    })
)(CatchMenu)