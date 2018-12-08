import React,{Component} from 'react'
import {View,TextInput,StyleSheet,Image,Text,ImageBackground,Dimensions} from 'react-native'
import {connect} from 'react-redux'
import * as LoginAction from '../redux/actions/LoginAction'
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')
class LoginComponent extends Component{
    render(){
        return(
            // <View  = {require('../utils/images/LoginBackground.jpg')}>
            //     <Text style = {styles.header}>SƠN LÂM</Text>
            // </Image>
            <View style={styles.container}>
                <ImageBackground
                style = {styles.backgroundImage}
                source = {require('../utils/images/LoginBackground.jpg')}
                >
                    <View>
                    <Text style = {styles.header}>SƠN LÂM</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    },
    header:{

    },
    backgroundImage:{
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

mapStateToProps = (state,action) => {
    return{

    }
}

mapDispatchToProps = (dispatch,action) => {
    return{

    }
}

export default LoginScreen = connect(mapStateToProps,mapDispatchToProps)(LoginComponent)
