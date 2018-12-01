import { combineReducers } from "redux"
import auth from './authReducer'
import usermanager from './userReducer/listUser'
import searchUser from './userReducer/searchUser'
import roles from './roleReducer/index'
import searchRole from './roleReducer/search'
import deviceTypes from './deviceTypeReducer/index'
import searchDeviceType from './deviceTypeReducer/search'
import computerTypes from './computerTypeReducer/index'
import searchComputerType from './computerTypeReducer/search'
import computerNames from './computerNameReducer/index'
import searchComputerName from './computerNameReducer/search'
import serviceTypes from './serviceTypeReducer/index'
import searchServiceType from './serviceTypeReducer/search'
import devices from './deviceReducer/index'
import searchDevices from './deviceReducer/search'
import services from './serviceReducer/index'
import searchServices from './serviceReducer/search'
import payments from './paymentReducer/index'
import searchPayments from './paymentReducer/search'
import accessorys from './accessoryReducer/index'
import searchAccessorys from './accessoryReducer/search'
import accessoryTypes from './accessoryTypeReducer/index'
import searchAccessoryTypes from './accessoryTypeReducer/search'
import customers from './customerReducer/listCustomer'
import searchCustomers from './customerReducer/searchCustomer'
import saleorders from './saleorderReducer/index'
import searchSaleorders from './saleorderReducer/search'

export default combineReducers({
    auth,
    usermanager,
    searchUser,
    roles,
    searchRole,
    deviceTypes,
    searchDeviceType,
    computerTypes,
    searchComputerType,
    computerNames,
    searchComputerName,
    serviceTypes,
    searchServiceType,
    devices,
    searchDevices,
    services,
    searchServices,
    payments,
    searchPayments,
    accessorys,
    searchAccessorys,
    accessoryTypes,
    searchAccessoryTypes,
    customers,
    searchCustomers,
    saleorders,
    searchSaleorders
});
