import React,{Component} from 'react';
import { Text, View, Picker, AsyncStorage, FlatList, Dimensions,StyleSheet,
    Image,TouchableOpacity,ImageBackground, TextInput,Keyboard} from 'react-native';
import {connect} from 'react-redux'
import * as base_64 from 'base-64'
import {getDevices,clearDeviceList, getMoreDevices} from '../redux/actions/DeviceAction'
import {getDeviceType} from '../redux/actions/DeviceTypeAction'
import Header from './layouts/Header'
import {MenuProvider} from 'react-native-popup-menu'
import NavigationService from '../navigations/NavigationService';
import {SearchBar} from 'react-native-elements'
const Size = Dimensions.get('window')
const base_image_url = 'http://18.216.184.198/'
const searchURL = 'https://us.123rf.com/450wm/arhimicrostok/arhimicrostok1708/arhimicrostok170801660/84518390-icon-of-loupe-search-button-magnifying-glass-flat-design-style-.jpg?ver=6'

class ProductComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
            role: '',
            page: 1,
            deviceType: 'All',
            devices: this.props.devices
        }
    }

    getToken = async () => {
        token = await AsyncStorage.getItem('token')
        return token
    }
    componentWillMount = async () => {
        token = await AsyncStorage.getItem('token')
        if(token) user = await JSON.parse(base_64.decode(token.split('.')[1]))
        if(user) this.setState({
            username: user.username,
            role: user.username
        })
        await [this.props._getDevices(token, 'All', 1), this.props._getDeviceType(token)]
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            devices: nextProps.devices
        })
    }

    getRandomColor () {
        var letters = '0123456789ABCDEF'
        var color = '#'
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
        return color
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
                    <View style = {styles.productTypeList}>
                        <FlatList
                        data = {this.props.productType}
                        keyExtractor = {(item)=>item.id}
                        renderItem = {this._renderProductTypeItem}
                        horizontal = {true}
                        />
                    </View>
                    <View style = {styles.productList}>
                        <FlatList 
                            ListHeaderComponent = {this._renderHeader}
                            data = {this.state.devices}
                            key = {(item) => item._id}
                            onRefresh = {this._onRefresh}
                            refreshing = {false}
                            numColumns = {1}
                            renderItem = {this._renderItem}
                            keyExtractor = {(item) => item._id}
                            onEndReached = {this._loadMoreProduct}
                            onEndReachedThreshold = {0.5}
                        />
                    </View>
                </View>
            </MenuProvider>
        )
    }

    search = (text) => {
        let dataShow = this.props.devices.filter((element) => {
            if(element.name.toLowerCase().indexOf(text.toLowerCase()) != -1)
            return element;
        })
        this.setState({
            devices: dataShow
        })
    }

    clearSearch = () => {
        this.setState({
            devices: this.props.devices
        })
    }
    _renderHeader = () => {
        return(
            <SearchBar
            lightTheme
            onChangeText={this.search}
            onClear={this.clearSearch}
            placeholder='Search...' 
            containerStyle = {{width:Size.width, height: 50, flex:1, paddingHorizontal:10, paddingVertical: 10}}
            />
        )
    }

    _loadMoreProduct = async () => {
        await this.setState({
            page: this.state.page + 1
        })
        await this.props._getMoreDevices(this.getToken(),this.state.deviceType,this.state.page)
    }
    _renderProductTypeItem = ({item,index}) => {
        return(
            <TouchableOpacity style = {{width: Size.width/4, height: Size.height/10}}
            onPress = {() => this._PressProductType(item)}>
                <Text style = {[{fontWeight:'bold'},{color:this.getRandomColor()}]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    _PressProductType = async (item) => {
        await this.setState({
            page: 1,
            deviceType: item.name
        })
        // await this.props._clearDeviceList()
        await this.props._getDevices(this.getToken(),item.name,1)
    }
    _renderItem = ({item,index}) => {
        return(
            <TouchableOpacity style = {[{width:Size.width, height: 250, flex:1, paddingHorizontal:10, paddingVertical: 10, borderBottomColor: 'black',borderBottomWidth:1}]}
            onPress = {()=>{NavigationService.navigate('ProductDetailScreen',{item:item})}}
            >
                <View style = {{flex:4, flexDirection:'row',justifyContent:'center'}}>
                    <ImageBackground
                        source = {{uri:base_image_url+item.image_url}}
                        style = {{flex:1}}
                    />
                    <View style = {{flexDirection:'column', flex:1, justifyContent: 'center'}}>
                        <Text style = {{color: '#323835', marginLeft:10}}>Type: {item.type.name}</Text>
                        <Text style = {{color: '#323835', marginLeft:10}}>Price: {item.price} VND</Text>
                        <Text style = {{color: '#323835', marginLeft:10}}>Warranty: {item.guaranteeDuration}</Text>
                    </View>
                </View>
                <View style = {{flex:1, paddingTop: 10}}>
                    <Text style = {{flex:1,fontWeight:'bold',}}>{item.name}</Text>
                </View>
                
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    productList:{
        flex:7,
        width: '100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(240, 240, 240)',
    },
    container:{
        width:Size.width,
        flex:1,
        justifyContent:'center',
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
        devices: state.DeviceReducer.devices,
        productType: state.DeviceTypeReducer.deviceType
    }
}

mapDispatchToProps = (dispatch,action) => {
    return{
       _getDevices:(token, deviceType, page) => {
           dispatch(getDevices(token, deviceType, page))
       },
       _getDeviceType:(token) => {
           dispatch(getDeviceType(token))
       },
       _clearDeviceList: () => {
           dispatch(clearDeviceList())
       },
       _getMoreDevices: (token, deviceType, page) => {
           dispatch(getMoreDevices(token, deviceType, page))
       }
    }
}

export default ProductScreen = connect(mapStateToProps,mapDispatchToProps)(ProductComponent)