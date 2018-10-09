import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './components/ui/DefaultLayout';

import {UserForm} from './components/containers/UserManager'

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./components/ui/Dashboard'),
  loading: Loading,
});

// const Users = Loadable({
//   loader: () => import('./views/Users/Users'),
//   loading: Loading,
// });

// const User = Loadable({
//   loader: () => import('./views/Users/User'),
//   loading: Loading,
// });

const UserManager = Loadable({
  loader: () => import('./components/ui/UserManager/UserManager'),
  loading: Loading,
});

const NewUser = Loadable({
  loader: () => <UserForm />,
  loading: Loading,
});

const EditUser = Loadable({
  loader: ({match}) => <UserForm match = {match}/>,
  loading: Loading,
});

// const Role = Loadable({
//   loader: () => import('./views/RoleManager/index'),
//   loading: Loading,
// });

// const NewRole = Loadable({
//   loader: () => import('./views/RoleManager/NewRole'),
//   loading: Loading,
// });

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
  // { path: '/roles/', exact: true, name: 'Role Manager', component: Role },
  // { path: '/roles/newRole', exact: true, name: 'New Role', component: NewRole },
  // { path: '/roles/editRole', exact: true, name: 'Edit Role', component: NewRole },
  // { path: '/services/', exact: true, name: 'Service Manager', component: Service },
  // { path: '/services/newService', exact: true, name: 'New Service', component: NewService },
  // { path: '/services/editService', exact: true, name: 'Edit Service', component: NewService },
];

export default routes;
