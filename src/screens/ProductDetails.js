import React,{Component} from 'react';
import { Text, View, Picker, AsyncStorage,Image,Dimensions} from 'react-native';
import Header from './layouts/Header'
import {MenuProvider} from 'react-native-popup-menu'
const base_image_url = 'http://18.216.184.198:3000/'
const Size = Dimensions.get('window')

export default class ProductDetail extends Component{
    render(){
        const item = this.props.navigation.state.params && this.props.navigation.state.params.item || {}
        //console.log('Item:' + JSON.stringify(item))
        return(
            <MenuProvider>
                <Header title = 'Product Details' username = 'thanhson'/>
                <View style = {{flex:5}}>
                    <View style = {{flexDirection: 'column'}}>
                        <Image source = {{uri:base_image_url+item.image_url}}
                        style = {{width: Size.width * 0.9, height: Size.height / 2}}
                        />
                        <Text style = {{fontSize: 20, fontWeight: 'bold', color:'#3e3e4c'}}>{item.name}</Text>
                        <View style = {{flex:1}}>
                            <Text style = {{fontWeight:'bold', color:'#4242ce'}}>Thông tin chi tiết: </Text>
                            <Text> - {item.description[0]}</Text>
                            <Text> - {item.description[1]}</Text>
                            <Text> - {item.description[2]}</Text>
                            <Text> - {item.description[3]}</Text>
                            <Text> - {item.description[4]}</Text>
                            <Text> - {item.description[5]}</Text>
                            <Text style ={{color: 'red', fontWeight:'bold', fontSize:15}}>Price: {item.price} VND</Text>
                            <Text style ={{color: 'green', fontWeight:'bold', fontSize:15}}>Amount: {item.amount}</Text>
                        </View>
                        
                    </View>

                </View>
            </MenuProvider>
        ) 
    }
}