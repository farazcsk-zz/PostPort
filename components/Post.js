import React, { Component, PropTypes } from 'react';
import {
  Image,
} from 'react-native';

const propTypes = {
  source: PropTypes.string.isRequired,
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Image
        source={{ uri: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13398953_154179078328102_732947784_n.jpg?ig_cache_key=MTI3NjAzNzA1NzUxMTczNzQ1Nw%3D%3D.2' }}
        style={{ height: 320 }}
      />
    );
  }
}

Post.propTypes = propTypes;

export default Post;
