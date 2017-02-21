import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../styles/PostItem.style';

class PostItem extends Component {
  render() {
    const { title, subtitle, imageSource, even } = this.props;
    console.log(imageSource);
    const uppercaseTitle = title ? (
      <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>
        { title.toUpperCase() }
      </Text>
    ) : false;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.slideInnerContainer}
        onPress={() => { alert(`You've clicked '${title}'`); }}
      >
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          <Image
            source={{ uri: imageSource }}
            style={styles.image}
          />
          <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
        </View>
        <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          { uppercaseTitle }
          <Text style={[styles.subtitle, even ? styles.subtitleEven : {}]} numberOfLines={2}>
            { subtitle }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default PostItem;

