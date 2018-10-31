import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ListsHome from '../views/lists_home';
import ListsDetails from '../views/lists_detail';

const ListsTabView = ({ navigation }) => (
  <ListsHome banner="Lists" navigation={navigation} />
);

const ListsDetailTabView = ({ navigation }) => (
  <ListsDetails banner="Lists Detail" navigation={navigation} />
);

const ListsTab = StackNavigator({
  Lists_Detail: {
    screen: ListsDetailTabView,
    path: 'lists_detail',
    navigationOptions: {
      title: 'Lists Detail',
    },
  },
});

export default ListsTab;
