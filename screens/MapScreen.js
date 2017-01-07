import Exponent, { Components } from 'exponent';
import React, { PropTypes } from 'react';
import {
  Button,
} from 'react-native';

class MapScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'MAP',
      renderRight: (route, props) => <Button
        title="Logout"
        color="#3B3738"
        onPress={() => {
          // this.props.navigator.push('home');
          console.log(route,props);
        }}
      />,
    },
  }
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
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

export default MapScreen;
