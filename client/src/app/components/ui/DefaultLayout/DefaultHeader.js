import React, { Component } from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../../assets/img/brand/logo.svg'
import sygnet from '../../../assets/img/brand/sygnet.svg'
import {Link} from 'react-router-dom';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  onLogout = () =>{
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    window.location.href = '/';
  }
 
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <i className="d-md-down-none">Xin chào, {this.props.user.fullname}</i>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Cài đặt</strong></DropdownItem>
              <DropdownItem >
                <Link 
                  to = {`/usermanager/${this.props.user._id}/edit`}
                >
                  <i className="fa fa-user"></i> Thông tin
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick = {this.onLogout}><i className="fa fa-lock"></i> Đăng xuất</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
