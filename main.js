import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cixng3wpu013h0173pco0vc92' }),
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
    };
  }

  componentWillMount() {
    const { Location, Permissions } = Exponent;
    Permissions.askAsync(Permissions.LOCATION)
    .then((response) => {
      const { status } = response;
      if (status === 'granted') {
        Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        .then((location) => {
          this.setState(location.coords);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <HomeScreen />
          <Button
            title="Click me!"
            color="#05A5D1"
            onPress={() => {
              console.log('button press');
            }}
          />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Exponent.registerRootComponent(App);
