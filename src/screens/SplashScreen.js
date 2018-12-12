import React,{Component} from 'react'
import {View,StyleSheet,Text,AsyncStorage,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import NavigationService from '../navigations/NavigationService'

class SplassComponent extends Component{
    componentDidMount(){
       setTimeout(()=>{
         AsyncStorage.getItem('token').then((token,err) => {
            console.log('Token:' + token)
            if(token) { 
            NavigationService.navigate('HomeScreen', {token:token})}
            else NavigationService.navigate('LoginScreen')
         })
       },500)
    }

    componentWillMount(){
        NavigationService.setTopLevelNavigator(this.props.navigation)
        //AsyncStorage.setItem('token','abx')
    }

    render() {
        return(
            <View style = {styles.container}>
                <Text style = {styles.title}>Son Lam App Computer</Text>
                <TouchableOpacity onPress = {() => NavigationService.navigate('ChartScreen',{})}>
                    <Text>Click Here</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:40,
        fontWeight:'bold'
    }
})

mapStateToProps = (state) => {
    return {

    }
}

mapDispatchToProps = (dispatch) => {
    return{

    }
}

export default SplashScreen = connect(mapStateToProps,mapDispatchToProps)(SplassComponent)