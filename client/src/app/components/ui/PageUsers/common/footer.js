import React, { Component } from 'react';

class Footer extends Component {
    render(){
      return (
        <div>
            <footer className="footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 footer_col">
                  <div className="footer_column footer_contact">
                    <div className="logo_container">
                      <div className="logo"><a>SonLamComputer</a></div>
                    </div>
                    <div className="footer_title">Got Question? Call Us 24/7</div>
                    <div className="footer_phone">+84123456789</div>
                    <div className="footer_contact_text">
                      <p>49 Trần Văn Kỷ</p>
                      <p>Liên Chiểu, Đà Nẵng, Việt Nam</p>
                    </div>
                    <div className="footer_social">
                      <ul>
                        <li><a><i className="fab fa-facebook-f" /></a></li>
                        <li><a><i className="fab fa-twitter" /></a></li>
                        <li><a><i className="fab fa-youtube" /></a></li>
                        <li><a><i className="fab fa-google" /></a></li>
                        <li><a><i className="fab fa-vimeo-v" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 offset-lg-2">
                  <div className="footer_column">
                    <div className="footer_title">Find it Fast</div>
                    <ul className="footer_list">
                      <li><a>Computers &amp; Laptops</a></li>
                      <li><a>Cameras &amp; Photos</a></li>
                      <li><a>Hardware</a></li>
                      <li><a>Smartphones &amp; Tablets</a></li>
                      <li><a>TV &amp; Audio</a></li>
                    </ul>
                    <div className="footer_subtitle">Gadgets</div>
                    <ul className="footer_list">
                      <li><a>Car Electronics</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="footer_column">
                    <ul className="footer_list footer_list_2">
                      <li><a>Video Games &amp; Consoles</a></li>
                      <li><a>Accessories</a></li>
                      <li><a>Cameras &amp; Photos</a></li>
                      <li><a>Hardware</a></li>
                      <li><a>Computers &amp; Laptops</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="footer_column">
                    <div className="footer_title">Customer Care</div>
                    <ul className="footer_list">
                      <li><a>My Account</a></li>
                      <li><a>Order Tracking</a></li>
                      <li><a>Wish List</a></li>
                      <li><a>Customer Services</a></li>
                      <li><a>Returns / Exchange</a></li>
                      <li><a>FAQs</a></li>
                      <li><a>Product Support</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          {/* Copyright */}
          <div className="copyright">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="copyright_container d-flex flex-sm-row flex-column align-items-center justify-content-start">
                    <div className="copyright_content">{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                      Copyright © All rights reserved | Design by <i className="fa fa-heart" aria-hidden="true" /> by <a href="https://www.facebook.com/SonLamComputer/" target="_blank">SonLamComputer</a>
                      {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    </div>
                    <div className="logos ml-sm-auto">
                      <ul className="logos_list">
                        <li><a><img src={require("../../../../stylesheets/images/logos_1.png")} alt /></a></li>
                        <li><a><img src={require("../../../../stylesheets/images/logos_2.png")} alt /></a></li>
                        <li><a><img src={require("../../../../stylesheets/images/logos_3.png")} alt /></a></li>
                        <li><a><img src={require("../../../../stylesheets/images/logos_4.png")} alt /></a></li>
                      </ul>
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
export default Footer;