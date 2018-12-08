import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Provider,connect} from 'react-redux'
import {applyMiddleware,createStore} from 'redux'
import {addNavToReducer} from './src/redux/reducers/index'
import createSagaMiddleWare from 'redux-saga'
import {StackNavigator,createAppContainer,createStackNavigator} from 'react-navigation'
import {ScreenConfig} from './src/navigations/ScreenConfig'
import RootSagas from './src/redux/sagas/RootSagas'

sagaMiddleWare = createSagaMiddleWare()
sagaMiddleWare.run(RootSagas)

const navReducer = (state = {nav:{}}, action) => {
    const newNavState = Navigation.router.getStateForAction(action,state)
    return {nav:newNavState || state}
}
AppReducers = addNavToReducer(navReducer)
const store = createStore(AppReducers,applyMiddleware(sagaMiddleWare))
type Props = {};
const NavigationOption = StackNavigator(ScreenConfig)
const Navigation = createAppContainer(NavigationOption)
const NavigationContainer = connect()(Navigation)

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store = {this.store}>
          <NavigationContainer>

          </NavigationContainer>
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
