import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import Map from '../screens/MapScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  map: () => Map,
}));
