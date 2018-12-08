import React,{Component} from 'react'
import {View,StyleSheet,Text} from 'react-native'
import {connect} from 'react-redux'

class SplassComponent extends Component{
    componentDidMount(){

    }

    render() {
        return(
            <View style = {styles.container}>
                <Text style = {styles.title}>Son Lam Computer</Text>
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