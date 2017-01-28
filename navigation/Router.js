import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  map: () => MapScreen,
}));
