import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Text,
  TextInput,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardAction,
} from 'react-native-card-view';
import * as Animatable from 'react-native-animatable';

class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Home',
    },
  }
  render() {
    return (
      <ScrollView>
        <Animatable.View animation="bounceInDown" duration={550}>
          <Card styles={card}>
            <CardTitle>
              <Text style={styles.welcome}>
                W E L C O M E
              </Text>
            </CardTitle>
            <Text style={styles.instructions}>
              Please login to continue
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor:
                'transparent',
                borderBottomColor: '#3B3738',
                borderWidth: 1,
                margin: 10,
              }}
              multiline
              autoCapitalize="none"
              placeholder="Username"
            />
            <TextInput
              style={{
                height: 40,
                borderColor:
                'transparent',
                borderBottomColor: '#3B3738',
                borderWidth: 1,
                margin: 10,
              }}
              multiline
              autoCapitalize="none"
              placeholder="Password"
            />
            <CardAction>
              <Button
                containerStyle={styles.button}
                title="LOGIN"
                color="#3B3738"
                onPress={() => {
                  this.props.navigator.push('home');
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
    marginTop: 50,
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
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#843131',
    padding: 10,
    margin: 10,
    shadowColor: 'rgba(0, 0, 0, 0.117647)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  container: {
    paddingTop: 100,
    backgroundColor: '#fafafa',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#3B3738',
    margin: 10,
  },

  instructions: {
    textAlign: 'center',
    color: '#3B3738',
    marginBottom: 5,
  },
});

export default HomeScreen;


