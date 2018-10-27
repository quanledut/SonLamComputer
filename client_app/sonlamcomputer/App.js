/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, Image, Dimensions, Platform, StyleSheet } from 'react-native';
import { DrawerNavigator, DrawerItems } from "react-navigation";

import { Provider } from 'react-redux';

// import LoginPage from './app_structure/component/Login'
import LoginScreen1 from './app_structure/component/Login/screen1'
import LoginScreen3 from './app_structure/component/Login/screen3'

import store from './app_structure/stores/index'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// type Props = {};
// export default class App extends Component<Props> {

let headerOptions = {
  // headerStyle: { backgroundColor: "#FFFFFF" },
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('./assets/images/logo.png')}
        style={{ width: SCREEN_WIDTH * 0.57 }}
        resizeMode="contain"
      />
    </View>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);


  

const Navigator = DrawerNavigator({
  Login1: { screen: LoginScreen1, navigationOptions: headerOptions},
  Login3: { screen: LoginScreen3, navigationOptions: headerOptions}

}, {
  initialRouteName: 'Login3',
  contentOptions: {
    activeTintColor: '#548ff7',
    activeBackgroundColor: 'transparent',
    inactiveTintColor: '#ffffff',
    inactiveBackgroundColor: 'transparent',
    labelStyle: {
      fontSize: 15,
      marginLeft: 0,
    },
  },
  drawerWidth: SCREEN_WIDTH * 0.8,
  contentComponent: CustomDrawerContentComponent,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
})

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {/* <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text> */}
            <Navigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
