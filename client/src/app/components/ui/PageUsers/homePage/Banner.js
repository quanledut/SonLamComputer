import React, { Component } from 'react';
import BannerItems from './BannerItems'

class Banner extends Component {
    componentDidMount(props) {
        var loadScript = function(src) {
            var tag = document.createElement('script');
            tag.async = false;
            tag.src = src;
            document.getElementById('root').appendChild(tag);
          }
         loadScript("assets/js/jquery-3.3.1.min.js")
         loadScript("assets/styles/bootstrap4/popper.js")
         loadScript("assets/styles/bootstrap4/bootstrap.min.js")
         loadScript("assets/plugins/greensock/TweenMax.min.js")
         loadScript("assets/plugins/greensock/TimelineMax.min.js")
         loadScript("assets/plugins/scrollmagic/ScrollMagic.min.js")
         loadScript("assets/plugins/greensock/animation.gsap.min.js")
         loadScript("assets/plugins/greensock/ScrollToPlugin.min.js")
         loadScript("assets/plugins/OwlCarousel2-2.2.1/owl.carousel.js")
         loadScript("assets/plugins/slick-1.8.0/slick.js")
         loadScript("assets/plugins/easing/easing.js")
         loadScript("assets/js/custom.js")   
    }
    
    render() {
        return (
            <div className="banner_2">
                <div className="    " style={{ backgroundImage: `url(${require('../../../../stylesheets/images/banner_2_background.jpg')})` }} />
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