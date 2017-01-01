import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';

class HomeScreen extends React.Component {


  render() {
    return (
      <View>
        <Text> Honey I am home </Text>
        <TextInput
          placeholder="Username"
          underlineColorAndroid="#843131"
        />
        <TextInput
          placeholder="Password"
          underlineColorAndroid="#843131"
        />
      </View>
    );
  }
}

export default HomeScreen;
