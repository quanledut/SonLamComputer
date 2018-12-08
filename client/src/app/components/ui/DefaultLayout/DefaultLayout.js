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
// routes config
import routes from '../../../routes';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import { isLoggedIn, getCurrentUser } from '../../../utils/index';

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
      var users = getCurrentUser();
      console.log(users)
      this.setState({
        user:users
      })
    }
  }

  render() {
    var isUser = false;
    var routerLink = routes.filter((router) => {
      return router.path === '/viewcustomers' ? router: null
    });
    var navigationLinkItems = navigation.items.filter((item) => {
      return item.url === '/viewcustomers' ? item: null
    })
    var navigationLinks = {items : navigationLinkItems};
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
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                ) : (null)}
                { isLoggedIn() ? isUser ? <Redirect to="/viewcustomers" /> : <Redirect from="/" to="/dashboard" /> 
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
