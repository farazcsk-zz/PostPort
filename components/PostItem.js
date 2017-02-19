import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class PostItem extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#FFF',
  },
});

export default PostItem;

