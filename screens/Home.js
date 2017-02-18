import React, { PropTypes } from 'react';
import {
  View,
  Alert,
  Button,
  StyleSheet,
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

  login = () => {
    Exponent.Facebook.logInWithReadPermissionsAsync(
      '395836734110712', {
        permissions: ['public_profile'],
      })
    .then((response) => {
      if (response.type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?access_token=${response.token}`,
        )
        .then((response) => response.json())
        .then((responseData) => {
          Alert.alert(
            'Logged in!',
            `Hi ${responseData.name}!`,
          );
        });
        // https:graph.facebook.com/me?fields=posts{place}&access_token=
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="login with facebook"
          onPress={() => console.log('hello')}
        />
      </View>
    );
  }
}

Home.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Home;

