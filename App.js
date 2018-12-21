import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {Provider,connect} from 'react-redux'
import {applyMiddleware,createStore} from 'redux'
import {addNavToReducer} from './src/redux/reducers/index'
import createSagaMiddleWare from 'redux-saga'
import {StackNavigator,createAppContainer,createStackNavigator} from 'react-navigation'
import {ScreenConfig} from './src/navigations/ScreenConfig'
import SplashScreen from './src/screens/SplashScreen'
import LoginScreen from './src/screens/LoginScreen'
import ChartScreen from './src/screens/ChartScreen'
import HomeScreen from './src/screens/HomeScreen'
import ProductDetail from './src/screens/ProductDetails'
import UserDetailScreen from './src/screens/UserDetailScreen'
import RootSagas from './src/redux/sagas/RootSagas'
import NavigationService from './src/navigations/NavigationService'
import RootReducer from './src/redux/reducers/index'

const TopLevelNavigator = createStackNavigator(
  {
  SplashScreen: {
      screen : SplashScreen,
      navigationOptions:{
          header:null
      }
  },
  LoginScreen: {
      screen : LoginScreen,
      navigationOptions:{
          header:null
      }
  },
  ChartScreen: {
      screen: ChartScreen,
      navigationOptions:{
          header:null
      }
  },
  ProductDetailScreen: {
    screen: ProductDetail,
    navigationOptions:{
        header:null
    }
  },
  UserDetailScreen: {
    screen: UserDetailScreen,
    navigationOptions:{
      header:null
    }
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions:{
      header:null}}
  },
  {initialRouteName:'SplashScreen',
  navigationOptions:{header:null}})
const AppContainer = createAppContainer(TopLevelNavigator)

sagaMiddleWare = createSagaMiddleWare()
const store = createStore(RootReducer,applyMiddleware(sagaMiddleWare))
sagaMiddleWare.run(RootSagas)

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store = {store}>
        <AppContainer
        />
      </Provider> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
