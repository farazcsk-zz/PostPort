import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';

class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Home',
    },
  }
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
        <Button
          title="Click me!"
          color="#05A5D1"
          onPress={() => {
            this.props.navigator.push('map');
          }}
        />
      </View>
    );
  }
}

export default HomeScreen;
