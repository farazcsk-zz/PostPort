import { Components } from 'exponent';
import React from 'react';
import { View, Text } from 'react-native';

class Map extends React.Component {
  render() {
    return (
      <Components.MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.props.lat || 37.78825,
          longitude: this.props.lng || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

export default Map;
