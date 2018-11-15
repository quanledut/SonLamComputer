import React, { Component } from 'react';

class Items extends Component {
    render() {
        return (
            <div className="bestsellers_item">
                <div className="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                    <div className="bestsellers_image">
                        {this.props.image !== "None" ? <img src={this.props.image }alt /> 
                        : <img src={require("../../../../stylesheets/images/best_4.png") }alt />}
                    </div>
                    <div className="bestsellers_content">
                        <div className="bestsellers_category"><a href="#">Headphones</a></div>
                        <div className="bestsellers_name"><a>{this.props.title}</a></div>
                        <div className="rating_r rating_r_4 bestsellers_rating"><i /><i /><i /><i /><i /></div>
                        <div className="bestsellers_price discount">{this.props.amount}</div>
                    </div>
                </div>
                <div className="bestsellers_fav"><i className="fas fa-heart" /></div>
                <ul className="bestsellers_marks">
                    <li className="bestsellers_mark bestsellers_discount">-25%</li>
                    <li className="bestsellers_mark bestsellers_new">new</li>
                </ul>
            </div>
        );
    }
}
export default Items;