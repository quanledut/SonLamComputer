import React,{Component} from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {} from 'lottie-react-native'

export default class SecondScreen extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: 'Home',
        drawerIcon:({color}) =>{
            return(
                <View>
                    <Animation
                        ref = {animation => this.homeAnimation = animation}
                        style = {{width: 80, height: 80}}
                        loop = {false}
                        source = {require('../assets/soda_loader.json')}
                    >
                    </Animation>
                </View>
            )
        }
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