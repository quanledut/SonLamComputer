import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import DrawerNavigation from './DrawerNavigation'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style = {{flex:1,width:'100%',backgroundColor:'green'}}>
        <DrawerNavigation/>
      </View>
    );
  }
}
