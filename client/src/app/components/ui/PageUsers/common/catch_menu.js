import React, { Component } from 'react';

class CatchMenu extends Component {
    render(){
      return (
        <ul className="cat_menu">
            <li><a href="#">Computers &amp; Laptops <i className="fas fa-chevron-right ml-auto" /></a></li>
            <li className="hassubs">
            <a href="#">Linh kiện<i className="fas fa-chevron-right" /></a>
            <ul>
                <li className="hassubs">
                <a href="#">Menu Item<i className="fas fa-chevron-right" /></a>
                <ul>
                    <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                    <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                    <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                    <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                </ul>
                </li>
                <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
            </ul>
            </li>
            <li className="hassubs">
            <a href="#">Phụ kiện<i className="fas fa-chevron-right" /></a>
            <ul>
                <li className="hassubs">
                <a href="#">Menu Item<i className="fas fa-chevron-right" /></a>
                <ul>
                    <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                    <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                    <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                    <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                </ul>
                </li>
                <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
                <li><a href="#">Menu Item<i className="fas fa-chevron-right" /></a></li>
            </ul>
            </li>
            <li><a href="#">Thiết bị mạng<i className="fas fa-chevron-right" /></a></li>
            <li><a href="#">Thiết bị văn phòng<i className="fas fa-chevron-right" /></a></li>
        </ul>
      );
    }
  }
  export default CatchMenu;