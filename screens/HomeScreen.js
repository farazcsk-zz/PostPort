import { connect } from 'react-redux';

import { getPosts } from '../posts/postActions';
import Home from './Home';

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
  getPosts,
})(Home);
