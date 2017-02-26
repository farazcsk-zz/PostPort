import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../styles/PostItem.style';

class PostItem extends Component {
  state = {
    width: 175,
  };

  componentDidMount() {
    if (this.props.imageSource) {
      Image.getSize(this.props.imageSource, (width) => {
        console.log('width', width);
        this.setState({
          ...this.state,
          width,
        });
      });
    }
  }

  render() {
    const { title, subtitle, imageSource, even, onPostPress } = this.props;
    const uppercaseTitle = title ? (
      <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>
        { title.toUpperCase() }
      </Text>
    ) : false;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.slideInnerContainer}
        onPress={onPostPress}
      >
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          <Image
            source={{ uri: imageSource }}
            style={styles.image}
          />
          <View
            style={[
              styles.textContainer,
              even ? styles.textContainerEven : {},
            ]}
          >
            { uppercaseTitle }
            <Text style={[styles.subtitle, even ? styles.subtitleEven : {}]} numberOfLines={2}>
              { subtitle }
            </Text>
          </View>
          <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default PostItem;

