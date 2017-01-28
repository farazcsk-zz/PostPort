import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';

export default StackNavigator({
  home: { screen: HomeScreen },
  map: { screen: MapScreen },
});
