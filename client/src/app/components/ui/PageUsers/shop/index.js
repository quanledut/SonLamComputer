import React, { Component } from 'react';
import { Headers, Footer } from './../common/index'
import { Brand } from './../homePage'
import { SlideHome } from './shopcomponent/'

import '../../../../stylesheets/styles/shop_styles.css'
import '../../../../stylesheets/styles/shop_responsive.css'

class Shop extends Component {
    render() {
        return (
            <div className="super_container">
                {/* Header */}
                <Headers />

                {/* Home */}
                <SlideHome />

                {/* Shop */}
                <div className="shop">
                    <div className="container">
                        <div className="row">
                            {/* Shop Content */}
                            <div className="shop_content">
                                <div className="product_grid">
                                    <div className="product_grid_border" />
                                    {/* Product Item */}
                                    <div className="product_item is_new">
                                        <div className="product_border" />
                                        <div className="product_image d-flex flex-column align-items-center justify-content-center"><img src={require("../../../../stylesheets/images/new_5.jpg")} alt /></div>
                                        <div className="product_content">
                                            <div className="product_price">$225</div>
                                            <div className="product_name"><span><b>HDD 3.5 TOSHIBA 1TB SATA 32MB CACHE 7200RPM (DT01ACA100)</b></span></div>
                                            <div className="product_name"><span>Bộ nhớ đệm: 32 MB </span></div>
                                            <div className="product_name"><span>Tốc độ vòng xoay: 7200 RPM</span></div>
                                            <div className="product_name"><span>Kích thước: 3.5 inch</span></div>
                                        </div>
                                        <div className="product_fav"><i className="fas fa-heart" /></div>
                                        <ul className="product_marks">
                                            <li className="product_mark product_discount">-25%</li>
                                            <li className="product_mark product_new">new</li>
                                        </ul>
                                    </div>
                                    {/* Product Item */}
                                    <div className="product_item discount">
                                        <div className="product_border" />
                                        <div className="product_image d-flex flex-column align-items-center justify-content-center"><img src={require("../../../../stylesheets/images/featured_1.png")} alt /></div>
                                        <div className="product_content">
                                            <div className="product_price">$225<span>$300</span></div>
                                            <div className="product_name"><span><b>HDD 3.5 TOSHIBA 1TB SATA 32MB CACHE 7200RPM (DT01ACA100)</b></span></div>
                                            <div className="product_name"><span>Bộ nhớ đệm: 32 MB</span></div>
                                            <div className="product_name"><span>Tốc độ vòng xoay: 7200 RPM</span></div>
                                            <div className="product_name"><span>Kích thước: 3.5 inch</span></div>
                                        </div>
                                        <div className="product_fav"><i className="fas fa-heart" /></div>
                                        <ul className="product_marks">
                                            <li className="product_mark product_discount">-25%</li>
                                            <li className="product_mark product_new">new</li>
                                        </ul>
                                    </div>
                                </div>  
                                {/* Shop Page Navigation */}
                                <div className="shop_page_nav d-flex flex-row">
                                    <div className="page_prev d-flex flex-column align-items-center justify-content-center"><i className="fas fa-chevron-left" /></div>
                                    <ul className="page_nav d-flex flex-row">
                                        <li><a href="#">1</a></li>
                                        <li><a href="#">2</a></li>
                                        <li><a href="#">3</a></li>
                                        <li><a href="#">...</a></li>
                                        <li><a href="#">21</a></li>
                                    </ul>
                                    <div className="page_next d-flex flex-column align-items-center justify-content-center"><i className="fas fa-chevron-right" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                {/* Footer */}
                <Footer />
            </div>
        );
    }
}
export default Shop;