import React, { Component } from 'react';

class PopularCategories extends Component {
    render() {
        return (
            <div className="popular_categories">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="popular_categories_content">
                    <div className="popular_categories_title">Popular Categories</div>
                    <div className="popular_categories_slider_nav">
                      <div className="popular_categories_prev popular_categories_nav"><i className="fas fa-angle-left ml-auto" /></div>
                      <div className="popular_categories_next popular_categories_nav"><i className="fas fa-angle-right ml-auto" /></div>
                    </div>
                    {/*<div className="popular_categories_link"><a href="#">full catalog</a></div>*/}
                  </div>
                </div>
                {/* Popular Categories Slider */}
                <div className="col-lg-9">
                  <div className="popular_categories_slider_container">
                    <div className="owl-carousel owl-theme popular_categories_slider">
                      {/* Popular Categories Item */}
                      <div className="owl-item">
                        <div className="popular_category d-flex flex-column align-items-center justify-content-center">
                          <div className="popular_category_image"><img src={require("../../../../stylesheets/images/popular_1.png")} alt /></div>
                          <div className="popular_category_text">Smartphones &amp; Tablets</div>
                        </div>
                      </div>
                      {/* Popular Categories Item */}
                      <div className="owl-item">
                        <div className="popular_category d-flex flex-column align-items-center justify-content-center">
                          <div className="popular_category_image"><img src={require("../../../../stylesheets/images/popular_2.png" )}alt /></div>
                          <div className="popular_category_text">Computers &amp; Laptops</div>
                        </div>
                      </div>
                      {/* Popular Categories Item */}
                      <div className="owl-item">
                        <div className="popular_category d-flex flex-column align-items-center justify-content-center">
                          <div className="popular_category_image"><img src={require("../../../../stylesheets/images/popular_3.png" )}alt /></div>
                          <div className="popular_category_text">Gadgets</div>
                        </div>
                      </div>
                      {/* Popular Categories Item */}
                      <div className="owl-item">
                        <div className="popular_category d-flex flex-column align-items-center justify-content-center">
                          <div className="popular_category_image"><img src={require("../../../../stylesheets/images/popular_4.png" )}alt /></div>
                          <div className="popular_category_text">Video Games &amp; Consoles</div>
                        </div>
                      </div>
                      {/* Popular Categories Item */}
                      <div className="owl-item">
                        <div className="popular_category d-flex flex-column align-items-center justify-content-center">
                          <div className="popular_category_image"><img src={require("../../../../stylesheets/images/popular_5.png")} alt /></div>
                          <div className="popular_category_text">Accessories</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
export default PopularCategories;