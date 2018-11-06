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
                    console.log(computerNames, err)
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
                    console.log(deviceNames, err)
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
                    console.log(accessoriesNames, err)
                    if (!err) this.setState({
                        ...this.state,
                        accessoriesNames: accessoriesNames.docs
                    })
                });
        } 
    }

    render() {
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
                                        <Items/>
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