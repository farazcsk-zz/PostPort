import React, { PropTypes } from 'react';
import {
  View,
  Alert,
  Button,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';
import Exponent, { DangerZone } from 'exponent';

const { Lottie: Animation } = DangerZone;

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

  state ={
    progress: new Animated.Value(0),
    config: {
      duration: 3000,
      imperative: false,
    },
  }

  componentWillMount() {
    this.playAnimation();
  }

  playAnimation = () => {
    this.state.progress.setValue(0);
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: this.state.config.duration,
    }).start(({ finished }) => {
      if (finished) this.forceUpdate();
      this.playAnimation();
    });
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
        <View>
          <Animation
            ref={this.setAnim}
            style={{
              width: 200,
              height: 200,
            }}
            source={require('../assets/animations/PinJump.json')}
            progress={this.state.progress}
          />
        </View>
        <Button
          title="login with facebook"
          color="#262626"
          onPress={this.login}
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
    alignItems: 'center',
  },
});

export default Home;

