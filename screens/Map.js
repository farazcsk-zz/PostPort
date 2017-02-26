import { Components } from 'exponent';
import React, { Component, PropTypes } from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet, Animated, Text, Easing } from 'react-native';
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
    zIndex: -9999,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 12,
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
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
    isPostOpen: false,
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(screen.height - ITEM_PREVIEW_HEIGHT - 190);
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

  onPostPress = () => {
    if (!this.state.isPostOpen) {
      this.setState({
        ...this.state,
        isPostOpen: true,
      }, () => {
        Animated.timing(this.animatedValue, {
          toValue: 10,
          duration: 500,
          easing: Easing.exp,
        }).start();
      });
    } else {
      this.setState({
        ...this.state,
        isPostOpen: false,
      }, () => {
        Animated.timing(this.animatedValue, {
          toValue: screen.height - ITEM_PREVIEW_HEIGHT - 200,
          duration: 500,
          easing: Easing.circle,
        }).start();
      });
    }
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
    const animatedStyle = {
      height: this.animatedValue,
    };

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
        <TouchableOpacity
          style={styles.back}
          onPress={this.onFocusClick}
        >
          <Text style={{ fontWeight: 'bold' }}>🌀</Text>
        </TouchableOpacity>
        <Animated.View style={[styles.postContainer, animatedStyle]} />
        <Carousel
          showsHorizontalScrollIndicator={false}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={(index) => this.switchPost(index)}
        >
          {
            this.props.posts.map((post) => {
              const place = this.props.places[post.place];

              return (
                <PostItem
                  title={post.message}
                  subtitle={`${place.location.city}, ${place.location.country}`}
                  onPostPress={this.onPostPress}
                  imageSource={post.full_picture}
                  key={post.id}
                />
              );
            })
          }
        </Carousel>
      </View>
    );
  }
}

Map.propTypes = propTypes;

export default Map;
