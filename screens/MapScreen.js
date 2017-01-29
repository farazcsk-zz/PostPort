import { connect } from 'react-redux';

import { getUser, getPosts } from '../user/userActions';
import Map from './Map';

const mapStateToProps = (state) => {
  return {
    isLoading: state.user.isLoading,
    posts: state.user.posts,
  };
};

export default connect(mapStateToProps, {
  getUser,
  getPosts,
})(Map);
