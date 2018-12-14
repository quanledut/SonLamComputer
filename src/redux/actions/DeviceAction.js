import * as DeviceActionType from './DeviceActionType'

export const getAllDevices = (token) => {
    return{
        type:DeviceActionType.GET_DEVICE,
        token
    }
}

export const getDeviceSucess = (devices) => {
    return{
        type:DeviceActionType.GET_DEVICE_SUCCESS,
        devices
    }
}

export const getDeviceFailed = () => {
    return{
        type:DeviceActionType.GET_DEVICE_FAILED
    }
}