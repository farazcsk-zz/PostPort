import { connect } from 'react-redux';

import { setUser } from '../user/userActions';
import Home from './Home';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  setUser,
})(Home);
