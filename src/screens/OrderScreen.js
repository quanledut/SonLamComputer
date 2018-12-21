import React,{Component} from 'react';
import { Text, View, Picker, AsyncStorage, FlatList, Dimensions,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import * as base_64 from 'base-64'
import * as ServiceAction from '../redux/actions/ServiceAction'
import * as DeviceAction from '../redux/actions/DeviceAction'
import * as UserAction from '../redux/actions/UserAction'
import Header from './layouts/Header'
import {MenuProvider} from 'react-native-popup-menu'
import NavigationService from '../navigations/NavigationService';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
const Size = Dimensions.get('window')
const base_image_url = 'http://18.216.184.198:3000/'

class SellComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            docs:[{
                _id: "5c1a0d31fbdc806d4607c6b7",
                totalPrice: 2290000,
                date: "2018-12-19T13:34:03.484Z",
                devices: [
                    {
                        name: "Bàn phím cơ Razer Blackwidow Ultimate 2016 (RZ03-01700100-R3M1)",
                        type: "Bàn Phím",
                        price: 2290000,
                    }
                ],
                serviceType: "5c1707f559889a5015f9506f",
                customer: {
                    _id: "5c1a0d31fbdc806d4607c6b7",
                    gender: "nam",
                    fullname: "Lê A",
                },
            }]
        }
    }

    componentWillMount = async () => {
        console.log('Service Sell Props: '+JSON.stringify(this.props.serviceSell))
        token = await AsyncStorage.getItem('token')
        if(token) user = await JSON.parse(base_64.decode(token.split('.')[1]))
        if(user) this.setState({
            username: user.username,
            role: user.username
        })
        await this.props.getServiceSell(token);
    }

    componentDidMount(){
        console.log('Service Sell Props: '+this.props.serviceSell)
    }

    render(){
        return(
                // <View style = {styles.container}>
                    <View style = {styles.productList}>
                        <FlatList 
                            ListHeaderComponent = {this._headerService}
                            data = {this.props.serviceSell}
                            //data = {this.state.docs}
                            key = {(item) => item.id}
                            onRefresh = {this._onRefresh}
                            refreshing = {false}
                            numColumns = {1}
                            renderItem = {this._renderServiceSell}
                            keyExtractor = {(item) => item.id}
                            onEndReached = {this._loadMoreServiceSell}
                        />
                    </View>
                // </View>
        )
    }

    _headerService = () => {
        return(
            <View style = {{flexDirection:'row', justifyContent:'center',alignItem:'center',flex:1, width: Size.width,backgroundColor:'#53d6b5', borderBottomWidth:1,borderBottomColor:'##46454c', padding:2}}>
                <Text style = {{fontWeight:'bold',textAlign: 'center', flex:0.5, borderRightWidth:1, borderRightColor: '#767882' }}>Id</Text>
                <Text style = {{fontWeight:'bold',textAlign: 'center', flex:1.8, borderRightWidth:1, borderRightColor: '#767882'}}>Customer</Text>
                <Text style = {{fontWeight:'bold',textAlign: 'center', flex:4, borderRightWidth:1, borderRightColor: '#767882'}}>Device</Text>
                <Text style = {{fontWeight:'bold',textAlign: 'center', flex:1.2}}>Price</Text>
            </View>
        )
    }

    _renderServiceSell = ({item,index}) => {
        return(
            <View style = {{flex:1,flexDirection:'row', justifyContent:"center",alignItem:'center',borderBottomWidth:1,borderBottomColor:'##46454c'}}>
                <View style = {{flex:0.5, justifyContent:'center', alignItem:'center'}}>
                    <TouchableOpacity>
                        <Text style = {{textAlign: 'center', flex:0.5 ,marginVertical: 5, marginHorizontal:2}}>{index}</Text>
                    </TouchableOpacity>
                </View>
                <View style  = {{flex:1.8,alignItem:'center', justifyContent:'center'}}>
                    <TouchableOpacity onPress = {() => this.props.getUserById(item)}>
                        <Text style = {{color:'green',textAlign: 'left', flex:1.8, textDecorationLine:'underline',marginLeft: 5}}>{item.customer.fullname}</Text>
                    </TouchableOpacity>
                </View>
                <View style  = {{flex:4,justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity onPress = {() => this.props.getDeviceById(item)}>
                        <Text style = {{color:'green',textAlign: 'left', flex:4, textDecorationLine:'underline',marginLeft:5}}>{(item.devices[0] && item.devices[0].name) || 'No name'}</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{flex:1.2, justifyContent:'center', alignItem:'center'}}>
                    <TouchableOpacity>
                        <Text style = {{fontWeight:'bold',textAlign: 'left', flex:1.2, margin: 5}}>{item.totalPrice}</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

mapStateToPropsSell = (state,action) => {
    return{
        serviceSell: state.ServiceSellReducer.serviceSell.docs,
        devices: state.DeviceReducer.devices,
    }
}

mapDispatchToPropsSell = (dispatch,action) => {
    return{
        getServiceSell: (token) => {
            dispatch(ServiceAction.getServiceSell(token))
        },
        getDeviceById: (item) => {
            dispatch(DeviceAction.getDeviceById(item.devices[0] && item.devices[0].deviceId))
        },
        getUserById: (item) => {
            dispatch(UserAction.getUserById((item.customer && item.customer._id) || '0'))
        }
    }
}

const Sell = connect(mapStateToPropsSell,mapDispatchToPropsSell)(SellComponent)


class FixComponent extends Component{
    async componentWillMount(){
        token = await AsyncStorage.getItem('token');
        this.props.getServiceFix(token)
        console.log('Service Fix token: '+token)
    }
        render(){
            return(
                    // <View style = {styles.container}>
                        <View style = {styles.productList}>
                            <FlatList 
                                ListHeaderComponent = {this._headerService}
                                data = {this.props.serviceFix}
                                key = {(item) => item.id}
                                onRefresh = {this._onRefresh}
                                refreshing = {false}
                                numColumns = {1}
                                renderItem = {this._renderServiceSell}
                                keyExtractor = {(item) => item.id}
                                onEndReached = {this._loadMoreServiceSell}
                            />
                        </View>
                    // </View>
            )
        }
    
        _headerService = () => {
            return(
                <View style = {{flexDirection:'row', justifyContent:'center',alignItem:'center',flex:1, width: Size.width,backgroundColor:'#53d6b5', borderBottomWidth:1,borderBottomColor:'##46454c', padding:2}}>
                    <Text style = {{fontWeight:'bold',textAlign: 'center', flex:0.5, borderRightWidth:1, borderRightColor: '#767882' }}>Id</Text>
                    <Text style = {{fontWeight:'bold',textAlign: 'center', flex:1.8, borderRightWidth:1, borderRightColor: '#767882'}}>Customer</Text>
                    <Text style = {{fontWeight:'bold',textAlign: 'center', flex:4, borderRightWidth:1, borderRightColor: '#767882'}}>Accessory</Text>
                    <Text style = {{fontWeight:'bold',textAlign: 'center', flex:1.2}}>Price</Text>
                </View>
            )
        }
    
        _renderServiceSell = ({item,index}) => {
            return(
                <View style = {{flex:1,flexDirection:'row', justifyContent:"center",alignItem:'center',borderBottomWidth:1,borderBottomColor:'##46454c'}}>
                    <View style = {{flex:0.5, justifyContent:'center', alignItem:'center'}}>
                        <TouchableOpacity>
                            <Text style = {{textAlign: 'center', flex:0.5 ,marginVertical: 5, marginHorizontal:2}}>{index}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style  = {{flex:1.8,alignItem:'center', justifyContent:'center'}}>
                        <TouchableOpacity onPress = {() => this.props.getUserById(item)}>
                            <Text style = {{color:'green',textAlign: 'left', flex:1.8, textDecorationLine:'underline',marginLeft: 5}}>{item.customer.fullname}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style  = {{flex:4,justifyContent:'center', }}>
                        <TouchableOpacity>
                            <Text style = {{color:'green',textAlign: 'left', flex:4, textDecorationLine:'underline',marginLeft:5}}>{(item.accessories[0] && item.accessories[0].name) || 'No name'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex:1.2, justifyContent:'center', alignItem:'center'}}>
                        <TouchableOpacity>
                            <Text style = {{fontWeight:'bold',textAlign: 'left', flex:1.2, margin: 5}}>{item.totalPrice}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
}

mapStateToPropsFix = (state,action) => {
    return{
        serviceFix: state.ServiceFixReducer.serviceFix.docs,
        devices: state.DeviceReducer.devices,
    }
}

mapDispatchToPropsFix = (dispatch,action) => {
    return{
        getServiceFix: (token) => {
            dispatch(ServiceAction.getServiceFix(token))
        },
        getUserById: (item) => {
            dispatch(UserAction.getUserById((item.customer && item.customer._id) || '0'))
        }  
    }
}

const Fix = connect(mapStateToPropsFix,mapDispatchToPropsFix)(FixComponent)

const TabNavigator = createMaterialTopTabNavigator({
    Sell:{
        screen: Sell
    },
    Fix:{
        screen: Fix
    }
})

const OrderContainer = createAppContainer(TabNavigator)

export default class OrderScreen extends Component{
    render(){
        return (
            <View style = {{flex:1}}>
                <MenuProvider>
                    <Header
                    title = 'Orders'
                    />
                    <View style = {{flex:4}}>
                        <OrderContainer/>
                    </View>
                </MenuProvider>
            </View>
        )
    }
}