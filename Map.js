import { Components } from 'exponent';
import React from 'react';
import { View, Text } from 'react-native';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  componentWillMount() {
    this.setState({
      region: {
        ...this.state.region,
        latitude: this.props.latitude,
        longitude: this.props.longitude,
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('current props', this.props);
    console.log('next props', nextProps);
    if (this.props !== nextProps) {
      this.setState({
        region: {
          ...this.state.region,
          latitude: nextProps.latitude,
          longitude: nextProps.longitude,
        },
      });
    }
  }
  render() {
    return (
      <Components.MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={this.state.region}
      />
    );
  }
}

export default Map;
