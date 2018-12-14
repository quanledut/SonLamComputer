import React,{Component} from 'react'
import {View,StyleSheet,Text,AsyncStorage,TouchableOpacity,Dimensions,Image} from 'react-native'
import {connect} from 'react-redux'
import NavigationService from '../navigations/NavigationService'
const Size = Dimensions.get('window')
class SplassComponent extends Component{
    componentDidMount(){
       setTimeout(()=>{
         AsyncStorage.getItem('token').then((token,err) => {
            console.log('Token:' + token)
            if(token) { 
            NavigationService.navigate('HomeScreen', {token:token})}
            else NavigationService.navigate('LoginScreen')
         })
       },2000)
    }

    componentWillMount(){
        //AsyncStorage.removeItem('token')
        NavigationService.setTopLevelNavigator(this.props.navigation)
    }

    render() {
        return(
            <View style = {styles.container}>
                <Image source = {{uri:'https://scontent.fdad3-2.fna.fbcdn.net/v/t1.0-9/32624868_1675174645891471_7063641856545914880_n.jpg?_nc_cat=107&_nc_ht=scontent.fdad3-2.fna&oh=e79c21968ffdb75f99260c5cbd45e88b&oe=5C6894AF'}}
                 style = {{width:Size.width,height:Size.height/3,}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0E1E2E'
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