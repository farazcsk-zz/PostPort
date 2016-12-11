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
      lat: 37.78825,
      lng: -122.4324,
    };
    this.getLocationAsync = this.getLocationAsync.bind(this);
  }

  componentWillMount() {
    this.getLocationAsync();
  }

  async getLocationAsync() {
    const { Permissions } = Exponent;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.log(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 },
    );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      throw new Error('Location permission not granted');
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <Map 
          lat={this.state.lat}
          lng={this.state.lng}
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
