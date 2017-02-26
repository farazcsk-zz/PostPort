import { Components } from 'exponent';
import React, { Component, PropTypes } from 'react';
import { View, Dimensions, Button, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import PostItem from '../components/PostItem';

import { sliderWidth, itemWidth } from '../styles/PostItem.style';

const propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  postIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  places: PropTypes.shape({}).isRequired,
};

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const ITEM_PREVIEW_HEIGHT = 150;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    backgroundColor: 'transparent',
    ...StyleSheet.absoluteFillObject,
  },
  postContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    paddingTop: screen.height - ITEM_PREVIEW_HEIGHT - 128,
  },
});

class Map extends Component {
  static navigationOptions = {
    title: 'Map',
    header: {
      visible: false,
    },
  };

  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  };

  componentWillMount() {
    const post = this.props.posts[0];
    const place = this.props.places[post.place];

    this.setState({
      ...this.state,
      region: {
        ...this.state.region,
        latitude: place.location.latitude,
        longitude: place.location.longitude,
      },
    });
  }

  onFocusClick = () => {
    const { postIds } = this.props;

    this.focusMap(postIds, true);
  }

  focusMap = (posts, animated) => {
    this.map.fitToSuppliedMarkers(posts, animated);
  }


  switchPost = (postIndex) => {
    const post = this.props.posts[postIndex];
    const place = this.props.places[post.place];

    this.map.animateToRegion({
      latitude: place.location.latitude,
      longitude: place.location.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Components.MapView
          style={styles.map}
          region={this.state.region}
          ref={(ref) => { this.map = ref; }}
        >
          {
            this.props.posts.map((post) => {
              const place = this.props.places[post.place];

              return (
                <Components.MapView.Marker
                  key={post.id}
                  identifier={post.id}
                  coordinate={{
                    latitude: place.location.latitude,
                    longitude: place.location.longitude,
                  }}
                  title={place.name}
                  description={`${place.location.city}, ${place.location.country}`}
                />
              );
            })
          }
        </Components.MapView>
        <View style={styles.postContainer}>
          <Button
            title="Show All"
            onPress={this.onFocusClick}
          />
          <Carousel
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={(index) => this.switchPost(index)}
          >
            {
              this.props.posts.map((post) => {
                return (
                  <PostItem
                    title={post.message ? post.message : 'nothing here!'}
                    imageSource={post.full_picture}
                    key={post.id}
                  />
                );
              })
            }
          </Carousel>
        </View>
      </View>
    );
  }
}

Map.propTypes = propTypes;

export default Map;
