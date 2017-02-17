import React, { PropTypes } from 'react';
import {
  ScrollView,
  Alert,
} from 'react-native';
import Exponent, { Components } from 'exponent';

const propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

class Home extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Home',
    },
  }

  componentWillMount() {
    Exponent.Facebook.logInWithReadPermissionsAsync(
      '395836734110712', {
      permissions: ['public_profile'],
    })
    .then((response) => {
      if (response.type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?access_token=${response.token}`
        )
        .then((response) => response.json())
        .then((responseData) => {
          Alert.alert(
            'Logged in!',
            `Hi ${responseData.name}!`,
          );
        })
      }
    });
  }

  render() {
    return (
      <ScrollView>
      </ScrollView>
    );
  }
}

Home.propTypes = propTypes;

export default Home;



