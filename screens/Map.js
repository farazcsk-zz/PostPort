import Exponent, { Components } from 'exponent';
import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
} from 'react-native';

const propTypes = {
  user: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    full_name: PropTypes.string,
  }).isRequired,
  getUser: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
};

class Map extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Map',
      tabBarPosition: 'bottom',
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
    this.props.getUser();
    this.props.getPosts();
    const { Location, Permissions } = Exponent;
    Permissions.askAsync(Permissions.LOCATION)
    .then((response) => {
      const { status } = response;
      if (status === 'granted') {
        Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        .then((location) => {
          this.setState({
            region: {
              ...this.state.region,
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
    if (this.props.user.isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color="#262626"
        />
      );
    } else {
      return (
        <Components.MapView
          style={{ flex: 1 }}
          region={this.state.region}
        >
          {this.props.user.posts.map(post => (
            <Components.MapView.Marker
              key={post.id}
              coordinate={{
                latitude: post.location.latitude,
                longitude: post.location.longitude,
              }}
            />
          ))}
        </Components.MapView>
      );
    }
  }
}

Map.propTypes = propTypes;

export default Map;
