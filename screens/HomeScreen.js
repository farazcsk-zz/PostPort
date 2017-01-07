import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
