import React, { Component } from 'react';
import {Headers, Footer} from './common/index'
import '../../../stylesheets/styles/main_styles.css'
import '../../../stylesheets/styles/responsive.css'
import {PopularCategories, Banner, Brand, Trends} from './homePage'
import {ProductItemUI} from '../../containers/client/home'

class ClientHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : [
          {
            name: "Computer & Laptop",
            code: "Laptop"
          },
          {
            name: "Linh kiện",
            code: "Harware"
          },
          {
            name: "Phụ kiện",
            code: "Accessories"
          },
          {
            name: "Thiết bị văn phòng",
            code: "OfficeEquipment"
          },
          {
            name: "Thiết bị mạng",
            code: "NetworkDevice"
          }
      ]
    }
  }

    render(){
      var Item = this.state.title.map((item, index) => {
        return (
          <ProductItemUI
            key = {index}
            title = {item.name}
            code = {item.code}
          />
        )
    });
      return (
        <div>
          <div className="super_container">
          {/* Header */}
          <Headers/>

          {/* Banner */}
          <Banner/>
          {/* Popular Categories */}
          <PopularCategories/>

          {Item}

          {/* Adverts */}
          <div className="adverts">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 advert_col">
                  {/* Advert Item */}
                  <div className="advert d-flex flex-row align-items-center justify-content-start">
                    <div className="advert_content">
                      <div className="advert_title"><a href="#">Trends 2018</a></div>
                      <div className="advert_text">Lorem ipsum dolor sit amet, consectetur adipiscing Donec et.</div>
                    </div>
                    <div className="ml-auto"><div className="advert_image"><img src={require("../../../stylesheets/images/adv_1.png")} alt /></div></div>
                  </div>
                </div>
                <div className="col-lg-4 advert_col">
                  {/* Advert Item */}
                  <div className="advert d-flex flex-row align-items-center justify-content-start">
                    <div className="advert_content">
                      <div className="advert_subtitle">Trends 2018</div>
                      <div className="advert_title_2"><a href="#">Sale -45%</a></div>
                      <div className="advert_text">Lorem ipsum dolor sit amet, consectetur.</div>
                    </div>
                    <div className="ml-auto"><div className="advert_image"><img src={require("../../../stylesheets/images/adv_2.png")} alt /></div></div>
                  </div>
                </div>
                <div className="col-lg-4 advert_col">
                  {/* Advert Item */}
                  <div className="advert d-flex flex-row align-items-center justify-content-start">
                    <div className="advert_content">
                      <div className="advert_title"><a href="#">Trends 2018</a></div>
                      <div className="advert_text">Lorem ipsum dolor sit amet, consectetur.</div>
                    </div>
                    <div className="ml-auto"><div className="advert_image"><img src={require("../../../stylesheets/images/adv_3.png")} alt /></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trends */}
          <Trends/>

          {/* Brands */}
          <Brand/>
          <hr/>
          {/* Footer */}
          <Footer/>
        </div>
      </div>
      );
    }
  }
  export default ClientHome;