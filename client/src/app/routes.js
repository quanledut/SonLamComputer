import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './components/ui/DefaultLayout';

import {UserForm } from './components/containers/user'
import {RoleForm, Roles} from './components/containers/roles'

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./components/ui/Dashboard'),
  loading: Loading,
});

const UserManager = Loadable({
  loader: () => import('./components/ui/UserManager/UserManager'),
  loading: Loading,
});


const EditUser = Loadable({
  loader: ({match}) => <UserForm match = {match}/>,
  loading: Loading,
});


// const Service = Loadable({
//   loader: () => import('./views/ServiceManager/index'),
//   loading: Loading,
// });

// const NewService = Loadable({
//   loader: () => import('./views/ServiceManager/NewService'),
//   loading: Loading,
// });

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
   { path: '/usermanager', exact: true, name: 'User Manager', component: UserManager },
   { path: '/usermanager/newuser', exact: true, name: 'Add New User', component: UserForm },
   { path: '/usermanager/:id/edituser', exact: true, name: 'Edit User', component: EditUser },
  { path: '/roles/', exact: true, name: 'Role Manager', component: Roles },
  { path: '/roles/new', exact: true, name: 'New Role', component: RoleForm },
  { path: '/roles/:id/edit', exact: true, name: 'Edit Role', component: RoleForm },
  // { path: '/services/', exact: true, name: 'Service Manager', component: Service },
  // { path: '/services/newService', exact: true, name: 'New Service', component: NewService },
  // { path: '/services/editService', exact: true, name: 'Edit Service', component: NewService },
];

export default routes;
