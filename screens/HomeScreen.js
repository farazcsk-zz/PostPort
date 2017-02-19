import { connect } from 'react-redux';

import { getPosts } from '../posts/postActions';
import { getIsLoading, getSuccess, getError } from '../posts/postsReducer';
import Home from './Home';

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state.posts),
  success: getSuccess(state.posts),
  error: getError(state.posts),
});

export default connect(mapStateToProps, {
  getPosts,
})(Home);
