import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Headers, Footer } from './../common/index'
import { SlideHome } from './shopcomponent/'

import '../../../../stylesheets/styles/shop_styles.css'
import '../../../../stylesheets/styles/shop_responsive.css'

class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: '',
            computerNames: [],
            deviceNames: [],
            accessoriesNames: [],
        };
    }
    componentWillMount(){
        var {match} = this.props;
        if(match.params.id)
        {
            var id = match.params.id;
            this.checkProps(id);
        }
    }

    checkProps = (id) => {
        if(id === 'Laptop')
        {
            this.setState({
                ...this.state,
                form: 'Computers & Laptop'
            });
            this.props.findAllLaptop({
                all: true
            }, (computerNames, err) => {
                if (!err) this.setState({
                    ...this.state,
                    computerNames: computerNames.docs,
                    deviceNames:[],
                    accessoriesNames:[]
                })
            });
        }
        if(id === 'Linh_kien')
        {
            this.setState({
                ...this.state,
                form: 'Linh kiện'
            });
            this.props.findAllHarware({
                all: true
            }, (deviceNames, err) => {
                if (!err) this.setState({
                    ...this.state,
                    deviceNames: deviceNames.docs,
                    computerNames:[],
                    accessoriesNames:[]
                })
            });
        }
        if(id ==='Phu_kien')
        {
            this.setState({
                ...this.state,
                form: 'Phụ kiện'
            });
            this.props.findAllAccessories({
                all: true
            }, (accessoriesNames, err) => {
                if (!err) this.setState({
                    ...this.state,
                    accessoriesNames: accessoriesNames.docs,
                    computerNames:[],
                    deviceNames:[]
                })
            });
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            var id = nextProps.match.params.id;
            this.checkProps(id);
            this.forceUpdate();
        }
    }

    render() {
        if(!this.state.form)
        {
            return(
                <Redirect to="/404"/>
            )
        }else
        {
            var mapList;
            if(this.state.computerNames.length > 0)
            {
                mapList = this.state.computerNames;
            }
            else if(this.state.deviceNames.length > 0)
            {
                mapList = this.state.deviceNames;
            }
            else
            {
                mapList = this.state.accessoriesNames;
            }

            var {match} = this.props;
            if(match.params.item)
            {
                mapList = mapList.filter((list) => {
                    var _id = list.type._id ? list.type._id : list.type;
                    return _id.indexOf(match.params.item) !== -1;
                });
            }
            
            var childItem = mapList.map((item, index) => {
                console.log(item.description)
                return (
                    <div className="product_item is_new" key={index}>
                        <div className="product_border" />
                        <div className="product_image d-flex flex-column align-items-center justify-content-center">
                            {item.image_url ? <img style={{height: '150px'}}src={item.image_url} alt />
                            :<img src={require("../../../../stylesheets/images/single_1.jpg")} alt />}
                        </div>
                        <div className="product_content">
                            <div className="product_price">{item.price}</div>
                            <div className="product_name"><span><b>{item.name ? item.name : item.type.name}</b></span></div>
                            {item.description ? 
                                item.description.map((item_desc,index2) =>{
                                    return(
                                    <div key={index2} className="product_name"><span>{item_desc}</span></div>
                                    )
                                }): ""}
                        </div>
                        <div className="product_fav"><i className="fas fa-heart" /></div>
                        <ul className="product_marks">
                            <li className="product_mark product_discount">-25%</li>
                            <li className="product_mark product_new">new</li>
                        </ul>
                    </div>
                )
            });
        }
        return (
            <div className="super_container">
                {/* Header */}
                <Headers />

                {/* Home */}
                <SlideHome title = {this.state.form ? this.state.form : ''}/>

                {/* Shop */}
                <div className="shop">
                    <div className="container">
                        <div className="row">
                            {/* Shop Content */}
                            <div className="shop_content">
                                <div className="product_grid">
                                    <div className="product_grid_border" />
                                    {/* Product Item */}
                                    {childItem}
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