import React,{Component} from 'react'
import {Icon} from 'react-native-elements' 
import {View,TextInput,StyleSheet,Image,Text,ImageBackground,Dimensions,TouchableWithoutFeedback,Keyboard,Button} from 'react-native'
import {connect} from 'react-redux'
import NavigationService from '../navigations/NavigationService'
import * as LoginAction from '../redux/actions/LoginAction'
import { ThemeProvider, Input, CheckBox } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')
class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            usernameError: false,
            passwordError: false,
            remember: false
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
                    <ImageBackground 
                    style = {styles.backgroundImage}
                    source = {require('../utils/images/LoginBackground.jpg')}
                    >
                        <View>
                        <Text style = {styles.header}>SƠN LÂM COMPUTER</Text>
                        </View>

                        <Input
                            placeholder='Username'
                            leftIcon={
                                <Icon
                                name='user'
                                type='evilicon'
                                //color='rgba(8, 54, 127, 0.8)'
                                color = 'white'
                                size = {SCREEN_WIDTH/15}
                                />
                            }
                            shake={true}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.usernameError}
                            onChangeText = {(text) => this.setState({
                                username: text,
                                usernameError: text === '' ? 'Username is required' : ''
                            })}
                        />
                        <Input
                            placeholder='Password'
                            secureTextEntry = {true}
                            leftIcon={
                                <Icon
                                name='fingerprint'
                                // color='rgba(8, 54, 127, 0.8)'
                                color = 'white'
                                size = {SCREEN_WIDTH/15}
                                />
                            }
                            shake={true}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.passwordError}
                            onChangeText = {(text) => this.setState({
                                password: text,
                                passwordError: text === '' ? 'Password is required' : ''
                            })}
                        />
                        {/* <CheckBox
                            center
                            title='Remember me'
                            checked={this.state.remember}
                            onPress = {() => {
                                this.setState({
                                    remember: !this.state.remember
                                })
                            }}
                            containerStyle = {{backgroundColor:'rgba(0,0,0,0)', borderWidth: 0}}
                        /> */}
                        <Text style = {[this.props.loginSuccess == 'Login success'?{color:'green'}:{color:'red'},{fontSize:15}]}>{this.props.loginSuccess}</Text>
                        <Button onPress = {this._onLogin}
                            icon={{
                                name: 'arrow-right',
                                size: 15,
                                color: 'white'
                            }}
                            title='Login'
                            style = {{backgroundColor: 'rgba(20, 100, 226, 1)'}}
                        />
                    </ImageBackground>
                </TouchableWithoutFeedback>               
            </View>
        )
    }
    _onLogin = () => {

        this.props._onLogin(this.state.username, this.state.password, this.state.remember)
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
        fontSize: 30,
        fontWeight:'bold',
        color: '#d61518'
    },
    backgroundImage:{
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.1,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 25,
        marginVertical: 15,
        marginHorizontal: 15
    }
})

mapStateToProps = (state,action) => {
    return{
        loginSuccess: state.LoginReducer.loginSuccess
    }
}

mapDispatchToProps = (dispatch,action) => {
    return{
        _onLogin: (username, password,remember) => {
            dispatch(LoginAction.requestLogin(username,password,true))
        }
    }
}

export default LoginScreen = connect(mapStateToProps,mapDispatchToProps)(LoginComponent)
