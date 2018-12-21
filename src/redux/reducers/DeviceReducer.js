import * as DeviceActionType from '../actions/DeviceActionType'

const defaultDeviceReducer = {
    device:{},
    devices: []
}

export default DeviceReducer = (state = defaultDeviceReducer, action) => {
    switch(action.type){
        case DeviceActionType.CLEAR_DEVICE_LIST:
            return{
                ...state,
                devices: []
            }
        case DeviceActionType.GET_DEVICE_SUCCESS:
            return{
                ...state,
                devices:  [...action.devices.docs]
            }
        case DeviceActionType.GET_MORE_DEVICE_SUCCESS:
            return{
                ...state,
                devices: [...state.devices,...action.devices.docs]
            }
        // case DeviceActionType.GET_DEVICE_BY_ID_SUCCESS:
        //     return {
        //         ...state,
        //         device: action.device
        //     }
        default:
            return state
    }
}