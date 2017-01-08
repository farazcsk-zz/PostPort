import React from 'react';
import * as Animatable from 'react-native-animatable';
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
} from 'react-native';

class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Login',
    },
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
              placeholder="Username"
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="#3B3738"
              autoCapitalize="none"
              placeholder="Password"
            />
            <CardAction>
              <Button
                containerStyle={styles.button}
                title="LOGIN"
                color="#3B3738"
                onPress={() => {
                  this.props.navigator.push('map');
                }}
              />
            </CardAction>
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

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

export default HomeScreen;


