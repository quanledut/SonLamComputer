import * as DeviceActionType from './DeviceActionType'

export const getDevices = (token, deviceType, page) => {
    return{
        type:DeviceActionType.GET_DEVICE,
        token,
        deviceType,
        page
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

export const clearDeviceList = () => {
    return{
        type: DeviceActionType.CLEAR_DEVICE_LIST
    }
}

export const getMoreDevices = (token, deviceType, page) => {
    return{
        type:DeviceActionType.GET_MORE_DEVICE,
        token,
        deviceType,
        page
    }
}

export const getDeviceById = (deviceId) => {
    return{
        type:DeviceActionType.GET_DEVICE_BY_ID,
        deviceId
    }
}
