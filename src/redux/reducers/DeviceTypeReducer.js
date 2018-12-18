import * as DeviceTypeActionType from '../actions/DeviceTypeActionType'
import { getDeviceSucess } from '../actions/DeviceAction';

const defaultDeviceType = {
    deviceType:{}
}

export default DeviceTypeReducer = (state = defaultDeviceType, actions) => {
    console.log(actions.type)
    switch(actions.type){
        case DeviceTypeActionType.GET_DEVICE_TYPE_SUCCESS:
            console.log('Get Device Type Sucess;' + actions.deviceType)
            return{
                ...state,
                deviceType: actions.deviceType.docs
            }
        default: 
            return state
    }
}
