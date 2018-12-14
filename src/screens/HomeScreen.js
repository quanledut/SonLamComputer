import React,{Component} from 'react';
import { Text, View, Picker, AsyncStorage} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Avatar} from 'react-native-elements'
import {MenuProvider} from 'react-native-popup-menu'
import {Menu,MenuOption,MenuOptions,MenuTrigger} from 'react-native-popup-menu'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProductScreen from './ProductScreen'
import RevenueScreen from './RevenueScreen'
import OrderScreen from './OrderScreen'
import Header from './layouts/Header'

const TabNavigator = createBottomTabNavigator({
  Product: {
      screen: ProductScreen,
      navigationOptions: () => ({
        tabBarIcon: () => (
            <MaterialIcons
                name='account-balance'
                // type='ionicon'
                color='#517fa4'
                size = {22}
            />
        )
      })
  },
  Order: {
    screen: OrderScreen,
    navigationOptions: () => ({
      tabBarIcon: () => (
          <MaterialIcons
              name='add-shopping-cart'
              // type='ionicon'
              color='#517fa4'
              size = {22}
          />
      )
    })
},
  Revenue: {
    screen: RevenueScreen,
    navigationOptions: () => ({
      tabBarIcon: () => (
          <MaterialIcons
              name='trending-up'
              // type='ionicon'
              color='#517fa4'
              size = {25}
          />
      )
    }),
},
});

const HomeContainer = createAppContainer(TabNavigator);
export default class HomeScreen extends Component{
    render(){
        return(
            <HomeContainer/>
        )
    }
}