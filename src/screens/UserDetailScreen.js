import React,{Component} from 'react';
import { View, Picker, AsyncStorage,Image,Dimensions} from 'react-native';
import Header from './layouts/Header'
import {MenuProvider} from 'react-native-popup-menu'
import {Text} from 'react-native-elements'
const base_image_url = 'http://18.216.184.198/'
const Size = Dimensions.get('window')


export default class UserDetailComponent extends Component{
    render(){
        const item = this.props.navigation.state.params && this.props.navigation.state.params.user || {}
        return(
            <MenuProvider>
                <Header title = 'User Details' username = 'thanhson' showBackButton = {true}/>
                    <View style = {{flexDirection: 'column', marginLeft: 15}}>
                        <Text h2>{item&&item.fullname}</Text>
                        <View style = {{flexDirection:'column'}}>
                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {{flex:1, fontSize:20, fontWeight:'bold'}}>Address:</Text>
                                <Text style = {{flex:3, fontSize:20, fontWeight:'bold'}}>{item && item.address}</Text>
                            </View> 
                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {{flex:1, fontSize:20, fontWeight:'bold'}}>Email:</Text>
                                <Text style = {{flex:3, fontSize:20, fontWeight:'bold'}}>{item && item.email}</Text>
                            </View> 
                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {{flex:1, fontSize:20, fontWeight:'bold'}}>Phone:</Text>
                                <Text style = {{flex:3, fontSize:20, fontWeight:'bold'}}>{item && item.phone}</Text>
                            </View> 
                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {{flex:1, fontSize:20, fontWeight:'bold'}}>No:</Text>
                                <Text style = {{flex:3, fontSize:20, fontWeight:'bold'}}>{item && item.code}</Text>
                            </View> 
                        </View>
                    </View>
            </MenuProvider>
        ) 
    }
}