import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

import MapScreen from './screens/MapScreen';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
    };
  }

  componentWillMount() {
    const { Location, Permissions } = Exponent;
    Permissions.askAsync(Permissions.LOCATION)
    .then((response) => {
      const { status } = response;
      if (status === 'granted') {
        Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        .then((location) => {
          this.setState(location.coords);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapScreen
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
