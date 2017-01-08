import { connect } from 'react-redux';

import { setUser, updateEmail, updatePassword } from '../user/userActions';
import Home from './Home';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  setUser,
  updateEmail,
  updatePassword,
})(Home);
