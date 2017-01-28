import { TabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';

export default TabNavigator({
  home: { screen: HomeScreen },
  map: { screen: MapScreen },
});
