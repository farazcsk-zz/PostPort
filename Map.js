import { Components } from 'exponent';
import React, { PropTypes } from 'react';

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
        region={this.state.region}
      >
        <Components.MapView.Marker
          coordinate={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
          }}
          title="Faraz"
          description="Testing on a live device is what you really want."
        />
      </Components.MapView>
    );
  }
}

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default Map;
