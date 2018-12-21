import * as ServiceActionType from './ServiceActionType'

export const getServiceSell = (token) => {
    return{
        type: ServiceActionType.GET_SERVICE_SELL,
        token
    }
} 

export const getServiceFix = (token) => {
    return{
        type: ServiceActionType.GET_SERVICE_FIX,
        token
    }
} 

