import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './components/ui/DefaultLayout';

import {UserForm, Users } from './components/containers/user'
import {RoleForm, Roles} from './components/containers/roles'

import {DeviceTypeForm, DeviceTypes} from './components/containers/devicetype'
import {ComputerTypeForm, ComputerType} from './components/containers/computertype'
import {ComputerNameForm, ComputerName} from './components/containers/computername'

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

  { path: '/devices/computerType', exact: true, name: 'Computer Type', component: ComputerType },
  { path: '/devices/computerType/new', exact: true, name: 'New Computer Type', component: ComputerTypeForm },
  { path: '/devices/computerType/:id/edit', exact: true, name: 'Edit Computer Type', component: ComputerTypeForm },

  { path: '/devices/computerName', exact: true, name: 'Computer Name', component: ComputerName },
  { path: '/devices/computerName/new', exact: true, name: 'New Computer Name', component: ComputerNameForm },
  { path: '/devices/computerName/:id/edit', exact: true, name: 'Edit Computer Name', component: ComputerNameForm },
  // { path: '/services/', exact: true, name: 'Service Manager', component: Service },
  // { path: '/services/newService', exact: true, name: 'New Service', component: NewService },
  // { path: '/services/editService', exact: true, name: 'Edit Service', component: NewService },
];

export default routes;
