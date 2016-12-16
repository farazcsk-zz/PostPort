import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Map from './Map';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
    };
  }

  componentWillMount() {
    const { Location } = Exponent;
    console.log('getting location...');
    Location.getCurrentPositionAsync({ enableHighAccuracy: true })
    .then((location) => {
      this.setState(location.coords);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Map
          latitude={this.state.latitude}
          longitude={this.state.longitude}
        />
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
