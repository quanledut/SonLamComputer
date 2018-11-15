import React, { Component } from 'react';

class CatchMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            computerTypes: [],
            deviceTypes: [],
            accessoriesTypes: [],
        };
    }

    componentWillMount(){
        this.props.findAllLaptopType({
            all: true
        }, (computerTypes, err) => {
            if (!err) this.setState({
                ...this.state,
                computerTypes: computerTypes.docs
            })
        });
       
        this.props.findAllHarwareType({
            all: true
        }, (deviceTypes, err) => {
            if (!err) this.setState({
                ...this.state,
                deviceTypes: deviceTypes.docs
            })
        });
    
        this.props.findAllAccessoriesType({
            all: true
        }, (accessoriesTypes, err) => {
            if (!err) this.setState({
                ...this.state,
                accessoriesTypes: accessoriesTypes.docs
            })
        });
    }

    render(){
        var mapListcomputerTypes;
        var mapListdeviceTypes;
        var mapListaccessoriesTypes;

        mapListcomputerTypes = this.state.computerTypes;
        mapListdeviceTypes = this.state.deviceTypes;
        mapListaccessoriesTypes = this.state.accessoriesTypes;

        var menuItem1 = mapListcomputerTypes.map((item, index) => {
            return (
                <li><a href="#">{item.name}<i className="fas fa-chevron-right" /></a></li>
            )
        });

        var menuItem2 = mapListdeviceTypes.map((item, index) => {
            return (
                <li><a href="#">{item.name}<i className="fas fa-chevron-right" /></a></li>
            )
        });

        var menuItem3 = mapListaccessoriesTypes.map((item, index) => {
            return (
                <li><a href="#">{item.name}<i className="fas fa-chevron-right" /></a></li>
            )
        });
      return (
        <ul className="cat_menu">
            <li className="hassubs">
                <a href="#/product/Laptop">Computers &amp; Laptops <i className="fas fa-chevron-right ml-auto" /></a>
                <ul>
                    {menuItem1}
                </ul>
            </li>
            <li className="hassubs">
                <a href="#/product/Linh_kien">Linh kiện<i className="fas fa-chevron-right" /></a>
                <ul>
                    {menuItem2}
                </ul>
            </li>
            <li className="hassubs">
                <a href="#/product/Phu_kien">Phụ kiện<i className="fas fa-chevron-right" /></a>
                <ul>
                    {menuItem3}
                </ul>
            </li>
        </ul>
      );
    }
  }
  export default CatchMenu;