import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CatchMenu from './catch_menu'

class MainNav extends Component {
    render(){
      return (
        <nav className="main_nav">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="main_nav_content d-flex flex-row">
                      {/* Categories Menu */}
                      <div className="cat_menu_container">
                        <div className="cat_menu_title d-flex flex-row align-items-center justify-content-start">
                          <div className="cat_burger"><span /><span /><span /></div>
                          <div className="cat_menu_text">Danh mục sản phẩm</div>
                        </div>
                        <CatchMenu/>
                      </div>
                      {/* Main Nav Menu */}
                      <div className="main_nav_menu ml-auto">
                        <ul className="standard_dropdown main_nav_dropdown">
                          <li><Link 
                                to = {`/Client`}
                            >
                                Trang chủ<i className="fas fa-chevron-down" />
                            </Link></li>
                          <li><a href="blog.html">Giới thiệu<i className="fas fa-chevron-down" /></a></li>
                          <li><a href="contact.html">Liên hệ<i className="fas fa-chevron-down" /></a></li>
                        </ul>
                      </div>
                      {/* Menu Trigger */}
                      <div className="menu_trigger_container ml-auto">
                        <div className="menu_trigger d-flex flex-row align-items-center justify-content-end">
                          <div className="menu_burger">
                            <div className="menu_trigger_text">menu</div>
                            <div className="cat_burger menu_burger_inner"><span /><span /><span /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
        );
    }
}
export default MainNav;