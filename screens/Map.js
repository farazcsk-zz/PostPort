import { Components } from 'exponent';
import React, { Component, PropTypes } from 'react';
import { View, Platform, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import PostItem from '../components/PostItem';

import { sliderWidth, itemWidth } from '../styles/PostItem.style';

const propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  postIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  places: PropTypes.shape({}).isRequired,
};

class Map extends Component {
  static navigationOptions = {
    title: 'Map',
  }

  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0315,
      longitudeDelta: 0.0258,
    },
  };

  componentWillMount() {
    const { posts } = this.props;
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
    console.log(`Markers received to populate map: ${posts}`);

    this.map.fitToSuppliedMarkers(posts, animated);
  }


  switchPost = (postIndex) => {
    const post = this.props.posts[postIndex];
    const place = this.props.places[post.place];

    this.map.animateToRegion({
      latitude: place.location.latitude,
      longitude: place.location.longitude,
      latitudeDelta: 0.0315,
      longitudeDelta: 0.0258,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Components.MapView
          style={{ flex: 1 }}
          region={this.state.region}
          ref={(ref) => { this.map = ref; }}
        >
          <Button
            title='Show All'
            onPress={this.onFocusClick}
          />
          {
            this.props.posts.map((post, index) => {
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
          <Carousel
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={(index) => this.switchPost(index)}
            containerCustomStyle={{ top: 325 }}
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
        </Components.MapView>
        {Platform.OS === 'android' &&
          <Carousel
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={(index) => this.switchPost(index)}
            containerCustomStyle={{
              paddingTop: 25,
              backgroundColor: '#fafafa',
            }}
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
        }
      </View>
    );
  }
}

Map.propTypes = propTypes;

export default Map;
