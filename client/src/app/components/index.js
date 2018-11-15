import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import '../stylesheets/App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../stylesheets/scss/style.css'

// Containers
//import { DefaultLayout } from './ui/DefaultLayout';
// Pages
import { Login, Page404, Page500, Register, DefaultLayout } from './containers/pages';
// import { renderRoutes } from 'react-router-config';
import { Home} from './containers/client/home';
import {Shops} from './containers/client/shop'

import '../stylesheets/styles/bootstrap4/bootstrap.min.css'
import '../stylesheets/plugins/fontawesome-free-5.0.1/css/fontawesome-all.css'
import '../stylesheets/plugins/OwlCarousel2-2.2.1/owl.carousel.css'
import '../stylesheets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css'
import '../stylesheets/plugins/OwlCarousel2-2.2.1/animate.css'
import '../stylesheets/plugins/slick-1.8.0/slick.css'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route exact path="/client" name="Client Home" component={Home} />
          <Route exact path="/product/:id" name="Product" component={Shops} />
          <Route exact path="/product/:id/:item" name="Product" component={Shops} />
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
