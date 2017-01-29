import Exponent, { Components } from 'exponent';
import React, { Component, PropTypes } from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';

import Post from '../components/Post';

const propTypes = {
  posts: PropTypes.any,
  isLoading: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
};

class Map extends Component {
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
      currentPost: null,
    };
  }

  componentWillMount() {
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

  setPost = (post) => {
    console.log('pin press');
    this.setState({
      ...this.state,
      region: {
        ...this.state.region,
        latitude: post.location.latitude,
        longitude: post.location.longitude,
      },
      currentPost: post,
    });
  }

  render() {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color="#262626"
        />
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Components.MapView
            style={{ flex: 1 }}
            region={this.state.region}
          >
            {this.props.posts.map(post => (
              <Components.MapView.Marker
                key={post.id}
                coordinate={{
                  latitude: post.location.latitude,
                  longitude: post.location.longitude,
                }}
                title={post.caption ? post.caption.text : ''}
                description={post.location ? post.location.name : ''}
                onPress={() => this.setPost(post)}
              />
            ))}
          </Components.MapView>
          <Post post={this.state.currentPost} />
        </View>
      );
    }
  }
}

Map.propTypes = propTypes;

export default Map;
