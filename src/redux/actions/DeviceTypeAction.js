import * as DeviceTypeActionType from './DeviceTypeActionType'

export const getDeviceType = (token) => {
    return{
        type: DeviceTypeActionType.GET_DEVICE_TYPE,
        token
    }
}

