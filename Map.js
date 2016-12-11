import { Components } from 'exponent';
import React from 'react';
import { View, Text } from 'react-native';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.setState({
      lat: this.props.lat,
      lng: this.props.lng,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        lat: this.props.lat,
        lng: this.props.lng,
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <Components.MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.lat,
          longitude: this.state.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

export default Map;
