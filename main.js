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
