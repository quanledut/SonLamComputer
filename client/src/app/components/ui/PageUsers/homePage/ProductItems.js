import React, { Component } from 'react';
import Items from './Items'

class ProductItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            computerNames: [],
            deviceNames: [],
            accessoriesNames: [],
        };
    }

    componentWillMount(){
        var {code} = this.props;
        if(code === "Laptop")
        {
            this.props.findAllLaptop({
                all: true
            }, (computerNames, err) => {
                if (!err) this.setState({
                    ...this.state,
                    computerNames: computerNames.docs
                })
            });
        } 
        if(code === "Harware")
        {
            this.props.findAllHarware({
                all: true
            }, (deviceNames, err) => {
                if (!err) this.setState({
                    ...this.state,
                    deviceNames: deviceNames.docs
                })
            });
        } 
        if(code === "Accessories")
        {
            this.props.findAllAccessories({
                all: true
            }, (accessoriesNames, err) => {
                if (!err) this.setState({
                    ...this.state,
                    accessoriesNames: accessoriesNames.docs
                })
            });
        } 
    }

    render() {
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
        let listItem = [];

        for (let i = 0; i < 12; i++) {
            if(mapList[i] !== undefined)
            {
                listItem.push(mapList[i]);
            }
        }
        var childItem = listItem.map((item, index) => {
            console.log(item)
            return (
                <Items 
                        key = {index}
                        title = {item.name ? item.name :item.type.name}
                        image = {item.image_url ? item.image_url : "None"}
                        amount = {item.price ? item.price : "Đang cập nhật"}
                />
            )
        });
        return (
            //{/* Best Sellers */}
            <div style={{ marginTop: 50 }}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="tabbed_container">
                                <div className="tabs clearfix tabs-right">
                                    <div className="new_arrivals_title">{this.props.title}</div>
                                    <ul className="clearfix">
                                        <li><span>See all >></span></li>
                                    </ul>
                                    <div className="tabs_line"><span /></div>
                                </div>
                                
                                <div className="bestsellers_panel panel active">
                                    {/* Best Sellers Slider */}
                                    <div className="bestsellers_slider slider">
                                        {/* Best Sellers Item */}
                                        {childItem}
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
export default ProductItem;