import * as ServiceActionType from '../actions/ServiceActionType'

const defaultServiceSell = {
    serviceSell: {
        a: 'b'
    }
}

export const ServiceSellReducer = (state = defaultServiceSell, action) => {
    switch(action.type){
        case ServiceActionType.GET_SERVICE_SELL_SUCCESS: 
            console.log('Service sell reducer return '+ (JSON.stringify(action.serviceSell)))
            return {
                ...state,
                serviceSell: action.serviceSell
            }
        case ServiceActionType.GET_SERVICE_SELL_FAILED:{
            return state
        }
        default: 
            return state
    }
}

const defaultServiceFix = {
    serviceFix: {}
}

export const ServiceFixReducer = (state = defaultServiceFix,action) => {
    switch(action.type){
        case ServiceActionType.GET_SERVICE_FIX_SUCCESS:
            return {
                ...state,
                serviceFix: action.serviceFix
            }
        case ServiceActionType.GET_SERVICE_FIX_FAILED:
            return{
                state
            }
        default:
            return state
    }
}