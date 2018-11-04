import React, { Component } from 'react';
import HeaderMain from './headerMain';
import MainNav from './mainNav';
import Menu from './Menu';

class Header extends Component {
    render(){
      return (
        <header className="header">
            {/* Top Bar */}
            {/*<TopBar/>    */}

            {/* Header Main */}
            <HeaderMain/>

            {/* Main Navigation */}
            <MainNav/>

            {/* Menu */}
            <Menu/>
        </header>
      );
    }
  }
  export default Header;