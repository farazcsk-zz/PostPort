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

  handleLogin = () => {
    const { email, password } = this.props.user;

    this.setState({
      loggingIn: true,
    });
    this.props.mutate({ variables: { email, password } })
      .then((data) => {
        if (data.data.signinUser.token) {
          this.setState({
            loggingIn: false,
          });
          this.props.setUser({
            user: {
              ...data.data.signinUser.user,
              token: data.data.signinUser.token,
            },
          });
          AsyncStorage.setItem('token', data.data.signinUser.token)
            .then(() => {
              this.props.navigator.push('map');
            });
        }
      });
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="bounceInDown" duration={600}>
          <Card styles={card}>
            <CardTitle>
              <Text style={styles.welcome}>
                Welcome
              </Text>
            </CardTitle>
            <Text style={styles.instructions}>
              Please login to continue
            </Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="#3B3738"
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={(email) => {
                this.props.updateEmail({ email });
              }}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="#3B3738"
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={(password) => {
                this.props.updatePassword({ password });
              }}
            />
            <CardAction>
              {this.state.loggingIn
                ?
                  <ActivityIndicator />
                  :
                  <Button
                    containerStyle={styles.button}
                    title="LOGIN"
                    color="#3B3738"
                    onPress={() => {
                      this.handleLogin();
                    }}
                  />
              }
            </CardAction>
          </Card>
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



