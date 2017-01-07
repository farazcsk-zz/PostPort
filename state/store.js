import { createNavigationEnabledStore, NavigationReducer } from '@exponent/ex-navigation';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';

import client from '../apollo';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const store = createStoreWithNavigation(
  combineReducers({
    navigation: NavigationReducer,
    apollo: client.reducer(),
  }),
  compose(
    applyMiddleware(client.middleware()),
  ),
);

export default store;
