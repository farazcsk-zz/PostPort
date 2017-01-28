import React from 'react';
import * as Animatable from 'react-native-animatable';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  Card,
  CardTitle,
  CardAction,
} from 'react-native-card-view';
import {
  ScrollView,
  StyleSheet,
  Button,
  Text,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
  View,
  WebView,
} from 'react-native';

class Home extends React.Component {
  state = {
    loggingIn: false,
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
        });
    }
  };

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="bounceInDown" duration={600}>
          <View>
            <WebView
              source={{ uri: 'https://api.instagram.com/oauth/authorize/?client_id=4497b2b242194db0b9386ada701977a3&redirect_uri=http://instagram.com&response_type=token' }}
              style={{ marginTop: 50, height: 500 }}
              onNavigationStateChange={this.onNavigationStateChange}
            />
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }
}
const loginMutation = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }){
      token
      user {
        id,
        firstName,
        lastName,
        email,
      }
    }
  }
`;

const card = {
  card: {
    marginTop: 100,
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 2,
    borderColor: '#843131',
  },
};

const styles = StyleSheet.create({
  input: {
    fontFamily: 'roboto-bold',
    width: 250,
    height: 40,
    margin: 20,
  },
  container: {
    paddingTop: 100,
    backgroundColor: '#fafafa',
  },

  welcome: {
    fontFamily: 'roboto-mono-regular',
    fontSize: 20,
    textAlign: 'center',
    color: '#3B3738',
    margin: 10,
  },

  instructions: {
    fontFamily: 'roboto-italic',
    textAlign: 'center',
    color: '#3B3738',
    marginBottom: 5,
  },
});

export default graphql(loginMutation)(Home);



