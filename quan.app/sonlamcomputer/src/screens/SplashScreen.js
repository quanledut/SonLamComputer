import React,{Component} from 'react'
import {View,Text,Dimensions} from  'react-native'
import LottieView from 'lottie-react-native'
const Size = Dimensions.get('window')
export default class SplashScreen extends Component{
    componentDidMount(){
        this.animation.play();
        setTimeout(()=>{
            this.props.navigation.navigate('LoginScreen')
        },500)
    }
    render(){
        return(
            <View syle = {{flex: 1, width:'100%',backgroundColor:'#7d7d7d',justifyContent:'center', alignItem: 'center'}}>
                <Text style = {{fontSize:40, fontWeight:'bold'}}>Sơn Lâm</Text>
                <Text>Computer</Text>
                <LottieView 
                    ref = {animation => {this.animation = animation}}
                    style = {{width: Size/4, height: Size/4}}
                    loop = {true}
                    source = {require('../../assets/tea.json')}
                    autoPlay = {true}
                >
                </LottieView>
            </View>
        )
    }
}