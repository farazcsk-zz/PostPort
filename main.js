import Exponent from 'exponent';
import React from 'react';
import {
  Provider,
} from 'react-redux';
import {
  StyleSheet,
  View,
} from 'react-native';

import store from './state/store';
import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

class App extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [],
        fonts: [
          { 'roboto-light': require('./assets/fonts/Roboto-Light.ttf') },
          { 'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf') },
          { 'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf') },
          { 'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf') },
          { 'roboto-mono-regular': require('./assets/fonts/RobotoMono-Regular.ttf') },
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.',
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <Router />
          </View>
        </Provider>
      );
    } else {
      return (
        <Exponent.Components.AppLoading />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

Exponent.registerRootComponent(App);
