import React, { Component } from 'react';
import BannerItems from './BannerItems'

class Banner extends Component {
    render() {
        return (
            <div className="banner_2">
                <div className="banner_2_background" style={{ backgroundImage: `url(${require('../../../../stylesheets/images/banner_2_background.jpg')})` }} />
                <div className="banner_2_container">
                    <div className="banner_2_dots" />
                    {/* Banner 2 Slider */}
                    <div className="owl-carousel owl-theme banner_2_slider">
                        {/* Banner 2 Slider Item */}
                        <BannerItems/>
                        {/* Banner 2 Slider Item */}
                        <BannerItems/>
                        {/* Banner 2 Slider Item */}
                        <BannerItems/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Banner;