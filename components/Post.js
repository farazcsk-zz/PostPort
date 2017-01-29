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
      <Image uri={this.props.source} style={{ height: 200 }} />
    );
  }
}

Post.propTypes = propTypes;

export default Post;
