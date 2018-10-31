import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }

    render()  {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                        
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white'
    },
    contentView: {
      flex: 1,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20,
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      backgroundColor: '#4F80E1',
      marginBottom: 20
    },
    heading: {
      color: 'white',
      marginTop: 10,
      fontSize: 22,
      fontWeight: 'bold'
    },
  });
  