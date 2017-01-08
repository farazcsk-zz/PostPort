import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { AsyncStorage } from 'react-native';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cixng3wpu013h0173pco0vc92',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    let token;

    AsyncStorage.getItem('token')
      .then((data) => {
        console.log('request with token', data);
        token = data;
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
      });

    next();
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

export default client;
