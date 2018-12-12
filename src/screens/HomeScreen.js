import React from 'react';
import { Text, View, Picker } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Icon} from 'react-native-elements'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            menu:''
        }
    }
  render() {
    return (
        <View>
            <View>
            <Icon
                name={'dots-three-vertical'}
                type={'entypo'}
                size={20}
                color='#FFF'
            />
            <Picker
            selectedValue={this.state.menu}
            onValueChange={(itemValue, itemIndex) => this.setState({menu:itemValue})}
            mode="dropdown">
            <Picker.Item label="Add Note" value="addnote" />
            <Picker.Item label="Share" value="share" />
            <Picker.Item label="Vault" value="vault" />
            </Picker>
        </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});

export default createAppContainer(TabNavigator);