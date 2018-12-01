import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './components/ui/DefaultLayout';

import {UserForm, Users } from './components/containers/user'
import {RoleForm, Roles} from './components/containers/roles'

import {DeviceTypeForm, DeviceTypes} from './components/containers/devicetype'
import {ComputerTypeForm, ComputerType} from './components/containers/computertype'
import {ComputerNameForm, ComputerName} from './components/containers/computername'
import {ServiceTypeForm, ServiceTypes} from './components/containers/servicetype'
import {DeviceNameForm, DeviceNames} from './components/containers/devicename'
import {ServiceForm, Services} from './components/containers/services'
import {PaymentForm, Payments} from './components/containers/payments'
import {AccessoryTypeForm, AccessoryTypes} from './components/containers/accessorytype'
import {AccessoryNameForm, AccessoryNames} from './components/containers/accessoryname'
import {CustomerForm, Customers} from './components/containers/customer'


function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./components/ui/Dashboard'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/usermanager', exact: true, name: 'Quản lý tài khoản', component: Users },
  { path: '/usermanager/new', exact: true, name: 'Tạo mới người dùng', component: UserForm },
  { path: '/usermanager/:id/edit/:isChangePassword', exact: true, name: 'Sửa người dùng', component: UserForm },

  { path: '/roles/', exact: true, name: 'Quản lý quyền', component: Roles },
  { path: '/roles/new', exact: true, name: 'Tạo mới quyền', component: RoleForm },
  { path: '/roles/:id/edit', exact: true, name: 'Sửa quyền', component: RoleForm },

  { path: '/devices/deviceType', exact: true, name: 'Loại thiết bị', component: DeviceTypes },
  { path: '/devices/deviceType/new', exact: true, name: 'Tạo mới loại thiết bị', component: DeviceTypeForm },
  { path: '/devices/deviceType/:id/edit', exact: true, name: 'Sửa loại thiết bị', component: DeviceTypeForm },

  { path: '/devices/accessoryType', exact: true, name: 'Loại linh kiện', component: AccessoryTypes },
  { path: '/devices/accessoryType/new', exact: true, name: 'Tạo mới lại linh kiện', component: AccessoryTypeForm },
  { path: '/devices/accessoryType/:id/edit', exact: true, name: 'Sửa loại linh kiện', component: AccessoryTypeForm },


  { path: '/devices/computerType', exact: true, name: 'Loại máy tính', component: ComputerType },
  { path: '/devices/computerType/new', exact: true, name: 'Tạo mới loại máy tính', component: ComputerTypeForm },
  { path: '/devices/computerType/:id/edit', exact: true, name: 'Sửa loại máy tính', component: ComputerTypeForm },

  { path: '/devices/computerName', exact: true, name: 'Máy tính', component: ComputerName },
  { path: '/devices/computerName/new', exact: true, name: 'Tạo mới máy tính', component: ComputerNameForm },
  { path: '/devices/computerName/:id/edit', exact: true, name: 'Sửa máy tính', component: ComputerNameForm },

  { path: '/services/serviceType', exact: true, name: 'Loại dịch vụ', component: ServiceTypes },
  { path: '/services/serviceType/new', exact: true, name: 'Tạo mới loại dịch vụ', component: ServiceTypeForm },
  { path: '/services/serviceType/:id/edit', exact: true, name: 'Sửa loại dịch vụ', component: ServiceTypeForm },

  { path: '/devices/device', exact: true, name: 'Thiết bị', component: DeviceNames },
  { path: '/devices/device/new', exact: true, name: 'Tạo mới thiết bị', component: DeviceNameForm },
  { path: '/devices/device/:id/edit', exact: true, name: 'Sửa thiết bị', component: DeviceNameForm },

  { path: '/devices/accessory', exact: true, name: 'Linh kiện', component: AccessoryNames },
  { path: '/devices/accessory/new', exact: true, name: 'Tạo mới linh kiện', component: AccessoryNameForm },
  { path: '/devices/accessory/:id/edit', exact: true, name: 'Sửa linh kiện', component: AccessoryNameForm },


  { path: '/services/service', exact: true, name: 'Dịch vụ', component: Services },
  { path: '/services/service/new', exact: true, name: 'Tạo mới dịch vụ', component: ServiceForm },
  { path: '/services/service/:id/edit', exact: true, name: 'Sửa dịch vụ', component: ServiceForm },

  { path: '/payments', exact: true, name: 'Thanh toán', component: Payments },
  { path: '/payments/:id/view', exact: true, name: 'Chi tiết thanh toán', component: PaymentForm },

  { path: '/customers', exact: true, name: 'Khách hàng', component: Customers },
  { path: '/customers/new', exact: true, name: 'Tạo mới khách hàng', component: CustomerForm },
  { path: '/customers/:id/edit', exact: true, name: 'Sửa khách hàng', component: CustomerForm },
];

export default routes;
