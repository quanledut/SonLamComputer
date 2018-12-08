import React from 'react';

import DefaultLayout from './components/ui/DefaultLayout';

import {UserForm} from './components/containers/user'
import {ViewCustomer} from './components/containers/viewcustomer'


function Loading() {
  return <div>Loading...</div>;
}

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/usermanager/:id/edit/:isChangePass', name: 'Sửa khách hàng', component: UserForm, isSelfEdit: true },

  { path: '/viewcustomers', exact: true, name: 'Thông tin cá nhân', component: ViewCustomer },
];

export default routes;
