import React,{Component} from 'react';
import { Text, View, Picker, AsyncStorage, FlatList, Dimensions,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import * as base_64 from 'base-64'
import {getAllDevices} from '../redux/actions/DeviceAction'
import Header from './layouts/Header'
import {MenuProvider} from 'react-native-popup-menu'
import NavigationService from '../navigations/NavigationService';
const Size = Dimensions.get('window')
const base_image_url = 'http://18.216.184.198:3000/'
class OrderComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[
                    {
                    "id": 1,
                    "name": "Bryce Thurlby",
                    "product": "Aspic - Light",
                    "email": "bthurlby0@usda.gov",
                    "price": "1787452.24",
                    "warranty": 12
                    }, {
                    "id": 2,
                    "name": "Kalle Sauvain",
                    "product": "Lamb Tenderloin Nz Fr",
                    "email": "ksauvain1@answers.com",
                    "price": "257127.93",
                    "warranty": 12
                    }, {
                    "id": 3,
                    "name": "Demetrius Mence",
                    "product": "Nut - Almond, Blanched, Ground",
                    "email": "dmence2@behance.net",
                    "price": "207585.92",
                    "warranty": 12
                    }, {
                    "id": 4,
                    "name": "Corny Rennix",
                    "product": "Pears - Fiorelle",
                    "email": "crennix3@admin.ch",
                    "price": "2039410.34",
                    "warranty": 12
                    }, {
                    "id": 5,
                    "name": "Christiane Lawson",
                    "product": "Basil - Pesto Sauce",
                    "email": "clawson4@barnesandnoble.com",
                    "price": "3574050.03",
                    "warranty": 12
                    }, {
                    "id": 6,
                    "name": "Salomone Wilkison",
                    "product": "Bread - Hamburger Buns",
                    "email": "swilkison5@arstechnica.com",
                    "price": "1988106.64",
                    "warranty": 12
                    }, {
                    "id": 7,
                    "name": "Shannan Sibley",
                    "product": "Sausage - Breakfast",
                    "email": "ssibley6@deviantart.com",
                    "price": "2053415.52",
                    "warranty": 12
                    }, {
                    "id": 8,
                    "name": "Karola Andretti",
                    "product": "Mushrooms - Honey",
                    "email": "kandretti7@xrea.com",
                    "price": "2306544.84",
                    "warranty": 12
                    }, {
                    "id": 9,
                    "name": "Neddie Glede",
                    "product": "Cabbage - Green",
                    "email": "nglede8@blogspot.com",
                    "price": "1835889.87",
                    "warranty": 12
                    }, {
                    "id": 10,
                    "name": "Martino Margarson",
                    "product": "Remy Red Berry Infusion",
                    "email": "mmargarson9@nifty.com",
                    "price": "1118864.78",
                    "warranty": 12
                    }, {
                    "id": 11,
                    "name": "Charisse Ferschke",
                    "product": "Beef - Top Sirloin - Aaa",
                    "email": "cferschkea@paginegialle.it",
                    "price": "1148957.27",
                    "warranty": 12
                    }, {
                    "id": 12,
                    "name": "Hollis Garton",
                    "product": "Wasabi Powder",
                    "email": "hgartonb@linkedin.com",
                    "price": "3074225.50",
                    "warranty": 12
                    }, {
                    "id": 13,
                    "name": "Kendall Dorsey",
                    "product": "Syrup - Pancake",
                    "email": "kdorseyc@europa.eu",
                    "price": "4987800.42",
                    "warranty": 12
                    }, {
                    "id": 14,
                    "name": "Thorvald Peto",
                    "product": "Wine - Peller Estates Late",
                    "email": "tpetod@wired.com",
                    "price": "3008153.84",
                    "warranty": 12
                    }, {
                    "id": 15,
                    "name": "Rawley Stocken",
                    "product": "Pastry - Butterscotch Baked",
                    "email": "rstockene@webnode.com",
                    "price": "4503627.99",
                    "warranty": 12
                    }]
            }
        }

    componentWillMount = async () => {
        token = await AsyncStorage.getItem('token')
        if(token) user = await JSON.parse(base_64.decode(token.split('.')[1]))
        if(user) this.setState({
            username: user.username,
            role: user.username
        })
        await this.props._getDevices(token);
    }

    componentDidMount(){
    }
    render(){
        return(
            <MenuProvider>
                 <View style = {styles.container}>
                    <Header 
                        title = 'Products'
                        username = {this.state.username}
                    />
                    <View style = {styles.productList}>
                        <FlatList 
                            ListHeaderComponent = {this._headerComponent}
                            data = {this.state.data}
                            key = {(item) => item.id}
                            onRefresh = {this._onRefresh}
                            refreshing = {false}
                            numColumns = {1}
                            renderItem = {this._renderItem}
                            keyExtractor = {(item) => item.id}
                            
                        />
                    </View>
                </View>
            </MenuProvider>
        )
    }

    _headerComponent = () => {
        return(

            <View style = {[{width:Size.width, height: 50, flexDirection: 'row'}]}>
                <Text style = {{flex:1}}>Name</Text>
                    <Text style = {{flex:2}}>Product</Text>
                    <Text style = {{flex:0.7}}>Price</Text>
                    <Text style = {{flex:0.5}}>Warranty</Text>
            </View>
        )
    }
    _renderItem = ({item,index}) => {
        return(
            <TouchableOpacity style = {[{width:Size.width, height: 50},index%2==0?{backgroundColor:'#bfc2cc'}:{}]}
            //onPress = {()=>{NavigationService.navigate('ProductDetailScreen',{item:item})}}
            >
                <View style = {{flex:4, flexDirection:'row',justifyContent:'center'}}>
                    <Text style = {{flex:1}}>{item.name}</Text>
                    <Text style = {{flex:2}}>{item.product}</Text>
                    <Text style = {{flex:0.7}}>{item.price}</Text>
                    <Text style = {{flex:0.5}}>{item.warranty}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    productList:{
        flex:8,
        justifyContent:'space-between',
        alignItems:'center'
    },
    container:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center'
    }
})

mapStateToProps = (state,action) => {
    return{
        // devices: state.DeviceReducer.devices
    }
}

mapDispatchToProps = (dispatch,action) => {
    return{
    //    _getDevices:(token) => {
    //        dispatch(getAllDevices(token))
    //    }
    }
}

export default OrderScreen = connect(mapStateToProps,mapDispatchToProps)(OrderComponent)

