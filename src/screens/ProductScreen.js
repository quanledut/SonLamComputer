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
class ProductComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
            role: '',
            productType:[
                {
                    id: "5bf98bca4d707738e296951e",
                    name: "HDD",
                    v: 0
                },
                {
                    id: "5bf98bca4d707738e296951f",
                    name: "Bàn Phím",
                    v: 0
                },
                {
                    id: "5bf98bca4d707738e2969520",
                    name: "LapTop",
                    v: 0
                },
                {
                    id: "5bf98bca4d707738e2969521",
                    name: "Chuột",
                    v: 0
                },
                {
                    id: "5bf98bca4d707738e2969522",
                    name: "SSD",
                    v: 0
                }
            ]
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
        // console.log('Product Type: ' +this.state.productType)
    }
    render(){
        return(
            <MenuProvider>
                 <View style = {styles.container}>
                    <Header 
                        title = 'Products'
                        username = {this.state.username}
                    />
                    <View style = {styles.productTypeList}>
                        <FlatList
                        data = {this.state.productType}
                        keyExtractor = {(item)=>item.id}
                        renderItem = {this._renderProductTypeItem}
                        horizontal = {true}
                        />
                    </View>
                    <View style = {styles.productList}>
                        <FlatList 
                            data = {this.props.devices}
                            key = {(item) => item._id}
                            onRefresh = {this._onRefresh}
                            refreshing = {false}
                            numColumns = {1}
                            renderItem = {this._renderItem}
                            keyExtractor = {(item) => item._id}
                            
                        />
                    </View>
                </View>
            </MenuProvider>
        )
    }

    _renderProductTypeItem = ({item,index}) => {
        return(
            <TouchableOpacity style = {{width: Size.width/4, height: Size.height/10}}>
                <Text style = {[{fontWeight:'bold'},index %2 == 0? {color:'#14874d'}:{color:'#2c27bc'}]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    _renderItem = ({item,index}) => {
        return(
            <TouchableOpacity style = {[{width:Size.width, height: 200},index%2==0?{backgroundColor:'#bfc2cc'}:{}]}
            onPress = {()=>{NavigationService.navigate('ProductDetailScreen',{item:item})}}
            >
                <View style = {{flex:4, flexDirection:'row',justifyContent:'center'}}>
                    <Image
                    source = {{uri:base_image_url+item.image_url}}
                    style = {{width:150, height:150}}
                    />
                    <View style = {{flexDirection:'column'}}>
                        <Text style = {{color: '#323835', marginLeft:10}}>Type: {item.type.name}</Text>
                        <Text style = {{color: '#323835', marginLeft:10}}>Price: {item.price} VND</Text>
                        <Text style = {{color: '#323835', marginLeft:10}}>Warranty: {item.guaranteeDuration}</Text>
                    </View>
                </View>
                <Text style = {{flex:1,fontWeight:'bold',}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    productList:{
        flex:7,
        justifyContent:'space-between',
        alignItems:'center'
    },
    container:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center'
    },
    productTypeList:{
        marginLeft:15,
        flex:0.5,
        justifyContent:'space-between',
        alignItems:'center'
    }
})

mapStateToProps = (state,action) => {
    return{
        devices: state.DeviceReducer.devices
    }
}

mapDispatchToProps = (dispatch,action) => {
    return{
       _getDevices:(token) => {
           dispatch(getAllDevices(token))
       }
    }
}

export default ProductScreen = connect(mapStateToProps,mapDispatchToProps)(ProductComponent)