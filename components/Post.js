import React, { Component, PropTypes } from 'react';
import {
  Image,
} from 'react-native';

const propTypes = {

};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log('some stuff', nextProps);
  }

  render() {
    return (
      <Image
        source={!this.props.post ? null : { uri: this.props.post.images.standard_resolution.url }}
        style={!this.props.post ? null : { height: 320 }}
      />
    );
  }
}

Post.propTypes = propTypes;

export default Post;
