import { Components } from 'exponent';
import React from 'react';
import { View, Text } from 'react-native';

class Map extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Test</Text>
        <Components.MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}

export default Map;
