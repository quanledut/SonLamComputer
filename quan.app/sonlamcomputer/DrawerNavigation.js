import React, {Component} from 'react';
import {} from 'react-native'
import {createDrawerNavigator,createAppContainer} from 'react-navigation'
import MainScreen from './src/screens/MainScreen'
import SplashScreen from './src/screens/SplashScreen'
import DetailScreen from './src/screens/DetailScreen'
import LoginScreen from './src/screens/Login'

const DrawerNavigation = createDrawerNavigator({
    Home:{
        screen: MainScreen
    },
    Detail: {
        screen:DetailScreen
    },
    SplashScreen:{
        screen: SplashScreen
    },
    LoginScreen:{
        screen: LoginScreen
    }
},
{
    initialRouteName: 'SplashScreen',
    //drawerPosition:'left'
})

export default AppContainer = createAppContainer(DrawerNavigation)