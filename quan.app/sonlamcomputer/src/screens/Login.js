import React,{Component} from 'react'
import {SafeAreaView
        ,CheckBox
        ,Image
        ,Text
        ,Dimensions
        ,View
        ,TextInput
        ,KeyboardAvoidingView
        ,TouchableWithoutFeedback
        ,Keyboard
        ,Platform
        ,StyleSheet
        ,TouchableOpacity
    } from 'react-native'
import LottieView from 'lottie-react-native'
import {} from 'react-native-gesture-handler';
const Size = Dimensions.get('window')
export default class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            remember: false,
            isLoggingIn: false
        }
    }
    render(){
        let LogginImage = this.state.isLoggingIn?<Image source = {{uri:'https://www.glsen.org/sites/default/files/LOGIN.jpg'}} 
                                                                    style = {{width:200,height:50}}/>
                                                :<LottieView source = {require('../../assets/code-icon.json')} autoPlay = {true} loop = {false} style = {{width:200,height:50}}/>
        return(
            <SafeAreaView style = {[styles.full,{backgroundColor:'#0E1E2E',}]}>
                <KeyboardAvoidingView 
                    behavior = {"padding"} 
                    style = {{width:"100%",flex:1,alignItems:'center',justifyContent:'center'}}
                    keyboardVerticalOffset={Platform.select({ios: 64, android: -200})}
                    >
                    <TouchableWithoutFeedback 
                        onPress = {()=>{Keyboard.dismiss()}}
                        style = {[styles.full]}
                    >
                        <View style = {[styles.full,{justifyContent:'center'}]}>
                            <Image source = {{uri:'https://scontent.fdad3-2.fna.fbcdn.net/v/t1.0-9/32624868_1675174645891471_7063641856545914880_n.jpg?_nc_cat=107&_nc_ht=scontent.fdad3-2.fna&oh=e79c21968ffdb75f99260c5cbd45e88b&oe=5C6894AF'}}
                                style = {{width:Size.width,height:Size.height/3,}}
                            />
                            <View style = {{backgroundColor:'#428484',width:Size.width/1.2,height: Size.height/15, borderRadius:15, paddingHorizontal: 15}}>                            
                                <TextInput
                                    placeholder ='Enter username'
                                    placeholderTextColor = 'rgba(255,255,255,0.6)'
                                    returnKeyType = 'next'
                                    autoCorrect = {false}
                                    onChangeText = {this._onChangeUserName}
                                    onSubmitEditing = {() => this.passwordInput.focus()}
                                    />
                            </View>
                            <View style = {{backgroundColor:'#428484',width:Size.width/1.2,height: Size.height/15, borderRadius:15, paddingHorizontal: 15,marginTop:15}}>                            
                                <TextInput
                                    ref = {passwordInput => this.passwordInput = passwordInput}
                                    placeholder ='Enter password'
                                    placeholderTextColor = 'rgba(255,255,255,0.6)'
                                    returnKeyType = 'done'
                                    autoCorrect = {false}
                                    onChangeText = {this._onChangePassword}
                                    secureTextEntry = {true}
                                    />
                            </View>
                            <View style = {{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                                <CheckBox
                                value = {this.state.remember}
                                onChange = {() => this.setState({remember:!this.state.remember})}
                                />
                                <Text style = {{borderRadius:15,fontSize: 18,color:'red'}}>Remember me</Text>
                            </View>
                            <TouchableOpacity
                            onPress = {this._login}
                            >
                                {!this.state.isLoggingIn?
                                    <View style = {{justifyContent:'center',alignItems:'center', width:Size.width/3,height:Size.height/15,backgroundColor:'#0f87ff',borderRadius:10}}>
                                        <Text style = {{fontSize:20, fontWeight:'bold',color:'white'}}>Login</Text>
                                    </View>
                                    :<LottieView source = {require('../../assets/code-icon.json')} autoPlay = {true} loop = {false} style = {{width:200,height:50}}/>}
                            </TouchableOpacity>

                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>               
            </SafeAreaView>

        )
    }

    _onChangeUserName = (text) =>{
        this.setState({
            username:text
        })
    }

    _onChangePassword = (text) => {
        this.setState({
            password:text
        })
    }

    _login = () => {
        this.setState({
            isLoggingIn:true
        })
    }
}

const styles = StyleSheet.create({
    full:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
})