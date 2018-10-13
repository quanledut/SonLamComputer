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
import { isLoggedIn } from '../../../utils/index';

class DefaultLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        name:'',
        _id:'',
        username:''
      }
    }
  }
  componentWillMount() {
    if (!isLoggedIn()) {
      this.props.history.push("/login")
    }
    else
    {
      var users = JSON.parse(localStorage.getItem("currentUser"));
      console.log(users)
      this.setState({
        user:users
      })
    }
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader  user={this.state.user}/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                { isLoggedIn() ? routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                ) : (null)}
                { isLoggedIn() ? <Redirect from="/" to="/dashboard" /> 
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
