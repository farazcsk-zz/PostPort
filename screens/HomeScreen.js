import React from 'react';
import {
  View,
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
        <TextInput
          placeholder="Username"
        />
        <TextInput
          placeholder="Password"
        />
        <Button
          title="Login"
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
