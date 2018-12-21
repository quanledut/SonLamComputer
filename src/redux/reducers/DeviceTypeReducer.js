import * as DeviceTypeActionType from '../actions/DeviceTypeActionType'
import { getDeviceSucess } from '../actions/DeviceAction';

const defaultDeviceType = {
    deviceType:[
        {
            _id: "000000000000000000000000",
            name: "All",
            createdAt: "2018-12-17T02:20:37.710Z",
            updatedAt: "2018-12-17T02:20:37.710Z",
            __v: 0
        }
    ]
}

const deviceTypeAll = {
    _id: "000000000000000000000000",
    name: "All",
    createdAt: "2018-12-17T02:20:37.710Z",
    updatedAt: "2018-12-17T02:20:37.710Z",
    __v: 0
}

export default DeviceTypeReducer = (state = defaultDeviceType, actions) => {
    console.log(actions.type)
    switch(actions.type){
        case DeviceTypeActionType.GET_DEVICE_TYPE_SUCCESS:
            return{
                ...state,
                deviceType: [deviceTypeAll,...actions.deviceType.docs]
                // deviceType: actions.deviceType.docs
            }
        default: 
            return state
    }
}
