import React, { PropTypes } from 'react';
import {
  ScrollView,
  AsyncStorage,
  View,
  WebView,
} from 'react-native';

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
      tabBarPosition: 'bottom',
    },
  }

  state = {
    loggingIn: true,
  };

  componentWillMount() {
    const { navigate } = this.props.navigation;

    if (this.props.user.id) {
      navigate('map');
      this.setState({
        loggingIn: false,
      });
    }
  }

  onNavigationStateChange = (navState) => {
    const { navigate } = this.props.navigation;
    const accessToken = navState.url.split('access_token=')[1];
    if (accessToken) {
      AsyncStorage.setItem('accessToken', accessToken)
        .then(() => {
          this.setState({
            ...this.state,
            loggingIn: false,
          });
          navigate('map');
        });
    }
  };

  render() {
    return (
      <ScrollView>
        <View>
          {this.state.loggingIn &&
            <WebView
              source={{ uri: 'https://api.instagram.com/oauth/authorize/?client_id=4497b2b242194db0b9386ada701977a3&redirect_uri=http://instagram.com&response_type=token' }}
              style={{ height: 500 }}
              onNavigationStateChange={this.onNavigationStateChange}
            />
        }
        </View>
      </ScrollView>
    );
  }
}

Home.propTypes = propTypes;

export default Home;



