import React,{Component} from 'react'
import {Text,View} from 'react-native'

export default class DetailScreen extends Component{
    render(){
        return(
            <View style = {{flex:1,width: '100%', backgroundColor:'yellow'}}>
                <Text>DetailScreen</Text>
            </View>
        )
    }
}