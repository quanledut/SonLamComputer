import React,{Component} from 'react'
import {TouchableOpacity, View, Text} from 'react-native'

export default class MainScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style = {{flex:1, width:'100%'}}>
                <Text>Home Screen</Text>
                <TouchableOpacity onPress = {
                    () => {
                        this.props.navigation.navigate('DrawerNavigation')
                    }
                }>
                    <Text>Open Draw Navigator</Text>
                </TouchableOpacity>
            </View>
        )
    }
}