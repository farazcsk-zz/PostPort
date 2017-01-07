import Exponent from 'exponent';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';

import client from './apollo';
import Router from './navigation/Router';

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
          <NavigationProvider router={Router}>
            <StackNavigation initialRoute="home" />
          </NavigationProvider>
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
