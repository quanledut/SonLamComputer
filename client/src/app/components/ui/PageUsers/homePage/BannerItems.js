import React, { Component } from 'react';

class Banner extends Component {
    render() {
        return (
            <div className="owl-item">
                <div className="banner_2_item">
                    <div className="container fill_height">
                        <div className="row fill_height">
                            <div className="col-lg-4 col-md-6 fill_height">
                                <div className="banner_2_content">
                                    <div className="banner_2_category">Laptops</div>
                                    <div className="banner_2_title">MacBook Air 13</div>
                                    <div className="banner_2_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum laoreet.</div>
                                    <div className="rating_r rating_r_4 banner_2_rating"><i /><i /><i /><i /><i /></div>
                                    <div className="button banner_2_button"><a>Explore</a></div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-6 fill_height">
                                <div className="banner_2_image_container">
                                    <div className="banner_2_image"><img src={require("../../../../stylesheets/images/banner_2_product.png")} alt /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Banner;