import React,{Component} from 'react'
import {Dimensions, StyleSheet,View,Text,AsyncStorage} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {Menu,MenuOption,MenuOptions,MenuTrigger, MenuProvider} from 'react-native-popup-menu'
import {Avatar} from 'react-native-elements'
import NavigationService from '../../navigations/NavigationService'
const Size = Dimensions.get('window')

export default class Header extends Component{
    render(){
        return(
            // <MenuProvider>
                <View style = {styles.container}>
                    <MaterialIcons
                    name = 'navigate-before'
                    color = '#0d24a5'
                    size = {25}
                    onPress = {()=>NavigationService.navigate('HomeScreen')}
                    />
                    <Text>{this.props.title}</Text>
                    <Menu>
                        <MenuTrigger style = {styles.avatar}>
                            <Avatar
                            size = 'medium'
                            rounded
                            title = 'SL'
                            color = 'rgb(162, 12, 165)'
                            source={{uri: "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.0-9/32624868_1675174645891471_7063641856545914880_n.jpg?_nc_cat=107&_nc_ht=scontent.fdad3-2.fna&oh=770e4c32c860810cb8131f8e3533387c&oe=5C9021AF"}}
                            activeOpacity={0.7}
                            />
                        </MenuTrigger>
                        <MenuOptions optionsContainerStyle = {styles.containerStyle}>
                            <MenuOption onSelect={() => { alert(`Thanhson`)}}>
                                <Text style={{color: '#210d84', fontWeight:'bold', borderBottomWidth: 1, borderBottomColor: '#4c4b51'}}>Hi {this.props.username}</Text>
                            </MenuOption>
                            <MenuOption onSelect={this._logout}>
                            <Text style={{color: 'red'}}>Logout</Text>
                            </MenuOption>
                        </MenuOptions>
                </Menu>
                </View>
// {/*                
//             </MenuProvider> */}
        )
    }

    _logout = () => {
        console.log('Log out')
        AsyncStorage.removeItem('token')
        NavigationService.navigate('LoginScreen')
    }
}

const styles = StyleSheet.create({
    container:{
        //flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        height:Size.height/10,
        width:Size.width,
        backgroundColor:'#05b57a'
    },
    avatar:{
        flexDirection:'row',
        right: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    username:{
        width:Size.width/5
    },
    containerStyle:{
        marginTop:40,
        backgroundColor:'rgba(12, 159, 165,1)',
        width:Size.width /4
    }
})
