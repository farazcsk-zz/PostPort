import { connect } from 'react-redux';

import { getUser } from '../user/userActions';
import Map from './Map';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  getUser,
})(Map);
