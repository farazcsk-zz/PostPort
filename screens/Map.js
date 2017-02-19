import Exponent, { Components } from 'exponent';
import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import PostItem from '../components/PostItem';

import { sliderWidth, itemWidth } from '../styles/PostItem.style';
import styles from '../styles/map.style';

const propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  places: PropTypes.shape({}).isRequired,
};

class Map extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Map',
      tabBarPosition: 'bottom',
    },
  }

  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

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
              ...this.state.region,
              ...location.coords,
            },
          });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Components.MapView
          style={{ flex: 1 }}
          region={this.state.region}
        >
          {
            this.props.posts.map((post) => {
              if (post.place) {
                const place = this.props.places[post.place];

                return (
                  <Components.MapView.Marker
                    key={post.id}
                    coordinate={{
                      latitude: place.location.latitude,
                      longitude: place.location.longitude,
                    }}
                    title={place.name}
                    description={`${place.location.city}, ${place.location.country}`}
                  />
                );
              }
              return null;
            })
          }
          {this.props.posts.length > 0 &&
            <Carousel
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            >
              {
                this.props.posts.map((post, index) => {
                  if (post.place) {
                    return (
                      <Text key={`post-${index}`}>{post.message ? post.message : 'nothing here!'}</Text>
                    );
                  }
                })
              }
            </Carousel>
          }
        </Components.MapView>
      </View>
    );
  }
}

Map.propTypes = propTypes;

export default Map;
