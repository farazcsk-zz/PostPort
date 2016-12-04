import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Map from './Map';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Map />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Exponent.registerRootComponent(App);
