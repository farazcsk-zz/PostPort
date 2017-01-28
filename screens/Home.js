import React from 'react';
import * as Animatable from 'react-native-animatable';
import {
  ActivityIndicator,
  ScrollView,
  AsyncStorage,
  View,
  WebView,
} from 'react-native';

class Home extends React.Component {
  state = {
    loggingIn: true,
  };
  static route = {
    navigationBar: {
      title: 'Login',
    },
  }


  onNavigationStateChange = (navState) => {
    const accessToken = navState.url.split('access_token=')[1];
    if (accessToken) {
      console.log(accessToken);
      AsyncStorage.setItem('accessToken', accessToken)
        .then(() => {
          console.log('logged in');
          this.setState({
            ...this.state,
            loggingIn: false,
          });
        });
    }
  };

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="bounceInDown" duration={600}>
          <View>
            {this.state.loggingIn ?
              <WebView
                source={{ uri: 'https://api.instagram.com/oauth/authorize/?client_id=4497b2b242194db0b9386ada701977a3&redirect_uri=http://instagram.com&response_type=token' }}
                style={{ marginTop: 50, height: 500 }}
                onNavigationStateChange={this.onNavigationStateChange}
              />
              :
              <ActivityIndicator
                size="large"
                color="#262626"
              />
          }
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Home;



