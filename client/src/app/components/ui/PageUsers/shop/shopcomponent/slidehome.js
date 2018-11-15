import React, { Component } from 'react';

class SlideHome extends Component {
    render() {
        return (
            <div className="home">
                <div className="home_background parallax-window" data-parallax="scroll" data-image-src={require('../../../../../stylesheets/images/shop_background.jpg')} />
                <div className="home_overlay" />
                <div className="home_content d-flex flex-column align-items-center justify-content-center">
                    <h2 className="home_title">{this.props.title}</h2>
                </div>
            </div>
        );
    }
}
export default SlideHome;