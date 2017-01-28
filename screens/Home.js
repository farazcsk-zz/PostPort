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

  // handleLogin = () => {
  //   const { email, password } = this.props.user;

  //   this.setState({
  //     loggingIn: true,
  //   });
  //   this.props.mutate({ variables: { email, password } })
  //     .then((data) => {
  //       if (data.data.signinUser.token) {
  //         this.setState({
  //           loggingIn: false,
  //         });
  //         this.props.setUser({
  //           user: {
  //             ...data.data.signinUser.user,
  //             token: data.data.signinUser.token,
  //           },
  //         });
  //         AsyncStorage.setItem('token', data.data.signinUser.token)
  //           .then(() => {
  //             this.props.navigator.push('map');
  //           });
  //       }
  //     });
  // }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="bounceInDown" duration={600}>
          <View>
            <WebView
              source={{ uri: 'https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token' }}
              style={{ marginTop: 50, height: 500 }}
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



