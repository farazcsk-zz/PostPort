import { Platform } from 'react-native';
import { createNavigationEnabledStore, NavigationReducer } from '@exponent/ex-navigation';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import devTools from 'remote-redux-devtools';

import user from '../user/userReducer';

import client from '../apollo';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const store = createStoreWithNavigation(
  combineReducers({
    navigation: NavigationReducer,
    apollo: client.reducer(),
    user,
  }),
  compose(
    applyMiddleware(client.middleware()),
    devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 5678,
    }),
  ),
);

export default store;
