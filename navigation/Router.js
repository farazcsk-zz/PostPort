import { TabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';

export default TabNavigator({
  home: { screen: HomeScreen },
  map: { screen: MapScreen },
}, {
  tabBarOptions: {
    activeTintColor: '#262626',
    inactiveTintColor: '#999',
    indicatorStyle: {
      backgroundColor: '#262626',
      height: 5,
    },
    labelStyle: {
      fontWeight: 'bold',
    },
    pressColor: '#999',
    showIcon: true,
    style: {
      backgroundColor: '#fafafa',
    },
    animationEnabled: false,
  },
});
