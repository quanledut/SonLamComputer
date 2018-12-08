import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {Provider,connect} from 'react-redux'
import {applyMiddleware,createStore} from 'redux'
import {addNavToReducer} from './src/redux/reducers/index'
import createSagaMiddleWare from 'redux-saga'
import {StackNavigator,createAppContainer,createStackNavigator} from 'react-navigation'
import {ScreenConfig} from './src/navigations/ScreenConfig'
import RootSagas from './src/redux/sagas/RootSagas'
import NavigationService from './src/navigations/NavigationService'
import RootReducer from './src/redux/reducers/index'

const TopLevelNavigator = createStackNavigator(
  ScreenConfig,
  {navigationOptions:{header: null},
  initialRouteName:'ChartScreen'})
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
        ref = {appContainer => {NavigationService.setTopLevelNavigator(appContainer)}}
        />
      </Provider>
    );
  }

  componentWillMount(){
      AsyncStorage.getItem('token').then((token, err) => {
        console.log(token, err);
        if(!token) NavigationService.navigate('Login',{})
        else NavigationService.navigate('Home',token)
  
      })
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
