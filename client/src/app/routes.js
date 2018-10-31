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
  { path: '/usermanager', exact: true, name: 'User Manager', component: Users },
  { path: '/usermanager/new', exact: true, name: 'Add New User', component: UserForm },
  { path: '/usermanager/:id/edit', exact: true, name: 'Edit User', component: UserForm },

  { path: '/roles/', exact: true, name: 'Role Manager', component: Roles },
  { path: '/roles/new', exact: true, name: 'New Role', component: RoleForm },
  { path: '/roles/:id/edit', exact: true, name: 'Edit Role', component: RoleForm },

  { path: '/devices/deviceType', exact: true, name: 'Device Type', component: DeviceTypes },
  { path: '/devices/deviceType/new', exact: true, name: 'New Device Type', component: DeviceTypeForm },
  { path: '/devices/deviceType/:id/edit', exact: true, name: 'Edit Device Type', component: DeviceTypeForm },

  { path: '/devices/accessoryType', exact: true, name: 'Accessory Type', component: AccessoryTypes },
  { path: '/devices/accessoryType/new', exact: true, name: 'New Accessory Type', component: AccessoryTypeForm },
  { path: '/devices/accessoryType/:id/edit', exact: true, name: 'Edit Accessory Type', component: AccessoryTypeForm },


  { path: '/devices/computerType', exact: true, name: 'Computer Type', component: ComputerType },
  { path: '/devices/computerType/new', exact: true, name: 'New Computer Type', component: ComputerTypeForm },
  { path: '/devices/computerType/:id/edit', exact: true, name: 'Edit Computer Type', component: ComputerTypeForm },

  { path: '/devices/computerName', exact: true, name: 'Computer Name', component: ComputerName },
  { path: '/devices/computerName/new', exact: true, name: 'New Computer Name', component: ComputerNameForm },
  { path: '/devices/computerName/:id/edit', exact: true, name: 'Edit Computer Name', component: ComputerNameForm },

  { path: '/services/serviceType', exact: true, name: 'Service Type', component: ServiceTypes },
  { path: '/services/serviceType/new', exact: true, name: 'New Service Type', component: ServiceTypeForm },
  { path: '/services/serviceType/:id/edit', exact: true, name: 'Edit Service Type', component: ServiceTypeForm },

  { path: '/devices/device', exact: true, name: 'Device', component: DeviceNames },
  { path: '/devices/device/new', exact: true, name: 'New Device', component: DeviceNameForm },
  { path: '/devices/device/:id/edit', exact: true, name: 'Edit Device', component: DeviceNameForm },

  { path: '/devices/accessory', exact: true, name: 'Accessory', component: AccessoryNames },
  { path: '/devices/accessory/new', exact: true, name: 'New Accessory', component: AccessoryNameForm },
  { path: '/devices/accessory/:id/edit', exact: true, name: 'Edit Accessory', component: AccessoryNameForm },


  { path: '/services/service', exact: true, name: 'Service', component: Services },
  { path: '/services/service/new', exact: true, name: 'New Service', component: ServiceForm },
  { path: '/services/service/:id/edit', exact: true, name: 'Edit Service', component: ServiceForm },

  { path: '/payments', exact: true, name: 'Payment', component: Payments },
  { path: '/payments/:id/view', exact: true, name: 'View Payment', component: PaymentForm },
];

export default routes;
