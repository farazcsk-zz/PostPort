import React, { PropTypes } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Animated,
  Text,
  ActivityIndicator,
} from 'react-native';
import Exponent, { DangerZone } from 'exponent';

const { Lottie: Animation } = DangerZone;

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  navigation: PropTypes.any,
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

  componentWillReceiveProps(nextProps) {
    const { navigate } = this.props.navigation;

    if (nextProps.success) {
      navigate('map');
    }
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
    const { getPosts } = this.props;

    Exponent.Facebook.logInWithReadPermissionsAsync(
      '395836734110712', {
        permissions: ['public_profile', 'user_posts', 'user_tagged_places'],
      })
    .then((response) => {
      if (response.type === 'success') {
        getPosts({ accessToken: response.token });
      }
    });
  }

  render() {
    const { isLoading } = this.props;

    return (
      <View style={styles.container}>
        <Text>Hi!</Text>
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
        {!isLoading ?
          <Button
            title="login with facebook"
            color="#262626"
            onPress={this.login}
          />
          :
          <ActivityIndicator />
        }
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

