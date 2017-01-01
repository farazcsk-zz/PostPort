import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';
import ViewerQuery from '../relay/ViewerQuery';
import { createRenderer } from '../relay/RelayUtils';
import RelayStore from '../relay/RelayStore';

RelayStore.reset(
  new Relay.DefaultNetworkLayer('http://localhost:5000/graphql'),
);

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.center}>
        <Text>User Length: {this.props.viewer.users.edges.length}</Text>
      </View>
    );
  }
}

// Create a Relay.Renderer container
export default createRenderer(HomeScreen, {
  queries: ViewerQuery,
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    `,
  },
});

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
