import * as DeviceActionType from '../actions/DeviceActionType'

const defaultDeviceReducer = {
  devices: []
}

export default DeviceReducer = (state = defaultDeviceReducer, action) => {
    switch(action.type){
        case DeviceActionType.GET_DEVICE_SUCCESS:
            return{
                ...state,
                devices:  action.devices.docs
            }

        case DeviceActionType.GET_DEVICE_FAILED:
        default:
            return state
    }
}