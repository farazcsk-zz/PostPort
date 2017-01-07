import Exponent, { Components } from 'exponent';
import React, { PropTypes } from 'react';

class MapScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'MAP',
    },
  }
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
    const { Location, Permissions } = Exponent;
    Permissions.askAsync(Permissions.LOCATION)
    .then((response) => {
      const { status } = response;
      if (status === 'granted') {
        Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        .then((location) => {
          this.setState({
            region: {
              ...location.coords,
            },
          });
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
    console.log(this.state);
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

MapScreen.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default MapScreen;
