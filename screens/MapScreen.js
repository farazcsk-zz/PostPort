import { connect } from 'react-redux';

import { getAllPosts } from '../posts/postsReducer';
import Map from './Map';

const mapStateToProps = (state) => {
  return {
    posts: getAllPosts(state.posts),
    postIds: state.posts.allIds,
    places: state.places.byId,
  };
};

export default connect(mapStateToProps, {
})(Map);
