import * as DeviceActionType from '../actions/DeviceActionType'

const defaultDeviceReducer = {
  devices: []
}

export default DeviceReducer = (state = defaultDeviceReducer, action) => {
    // console.log(action.type)
    switch(action.type){
        case DeviceActionType.GET_DEVICE_SUCCESS:
        console.log('Body: ')
        console.log(action.devices.docs)
            return{
                ...state,
                devices:  action.devices.docs
            }

        case DeviceActionType.GET_DEVICE_FAILED:
            console.log('Get device failed')
        default:
            return state
    }
}