import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';
import ProductList from "./lists";
import ProductDetail from './detail';
import Icon from 'react-native-vector-icons/FontAwesome';


const Product = StackNavigator({
    ProductList: {
        screen: ProductList,
        path: '/',
        navigationOptions: ({ navigation }) => ({
          headerLeft: (
            <Icon
              name="bars"
              size={30}
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }),
      },
      ProductDetail: {
        screen: ProductDetail,
        path: 'productDetail',
        navigationOptions: ({ navigation }) => ({
            headerLeft: (
              <Icon
                name="arrow-left"
                size={30}
                style={{ paddingLeft: 10 }}
                onPress={() => navigation.goBack()}
              />
            ),
          }),
        },
});

export default Product;