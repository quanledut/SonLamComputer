import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../../_nav';
import navigationClient from '../../../_navClient';
// routes config
import routes from '../../../routes';
import routeClients from '../../../routeClients';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import { isLoggedIn, getCurrentUser } from '../../../utils/index';
import * as UnAuthorizedErrorHandler from '../../../utils/handleAuthError';
class DefaultLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        name:'',
        _id:'',
        username:'',
        fullname:'',
        roles: []
      }
    }
  }
  componentWillMount() {
    if (!isLoggedIn()) {
      this.props.history.push("/login")
    }
    else
    {
      UnAuthorizedErrorHandler.setHistory(this.props.history);
      var users = getCurrentUser();
      console.log(users)
      this.setState({
        user:users
      })
    }
  }

  render() {
    var isUser = false;
    var routerLink = routeClients;
    var navigationLinks = navigationClient;
    isUser = this.state.user.roles.reduce((isUser, item) =>
      {if(isUser) return true; if(item.name === 'user') return true},false);
    console.log('isuser', isUser)
    if(!isUser)
    {
      routerLink = routes;
      navigationLinks = navigation;
    }
    console.log('userLink', routerLink)
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader  user={this.state.user}/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigationLinks} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routerLink}/>
            <Container fluid>
              <Switch>
                { isLoggedIn() ? routerLink.map((route, idx) => {
                    const {path, exact, name, component, ...remainning} = route;
                    return route.component ? (<Route key={idx} path={path} exact={exact} name={name} render={props => (
                        <route.component {...props}  {...remainning} />
                      )} />)
                      : (null);
                  },
                ) : (null)}
                { isLoggedIn() ? isUser ? <Redirect from="/" to="/viewcustomers" /> : <Redirect from="/" to="/dashboard" />
                : <Redirect to="/login" />}
              </Switch>
            </Container>
          </main>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
