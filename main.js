import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  View,
  Button,
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
    const { Location, Permissions } = Exponent;
    Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS)
    .then((response) => {
      const { status } = response;

      if (status === 'granted') {
        console.log('yoyoyo');
        Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        .then((location) => {
          this.setState(location.coords);
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Map
          latitude={this.state.latitude}
          longitude={this.state.longitude}
        />
        <Button
          title="Click me!"
          color="#05A5D1"
          onPress={() => {
            console.log('button press');
          }}
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
