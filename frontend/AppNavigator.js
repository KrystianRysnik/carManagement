import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import MapScreen from './screens/MapScreen';
import CarScreen from './screens/CarScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const AppNavigator = createMaterialTopTabNavigator(
  {
    Map:
    {
      screen: MapScreen,
      navigationOptions:
      {
        tabBarLabel: "Map",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="map" size={20} color="#fff" />
        )
      },
    },
    Car:
    {
      screen: CarScreen,
      navigationOptions:
      {
        tabBarLabel: "Car",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="car" size={20} color="#fff" />
        )
      },
    },
    Profile:
    {
      screen: ProfileScreen,
      navigationOptions:
      {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={20} color="#fff" />
        )
      },
    },
    Settings:
    {
      screen: SettingsScreen,
      navigationOptions:
      {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bars" size={20} color="#fff" />
        )
      },
    },
  },
  {
    initialRouteName: 'Map',
    tabBarOptions:
    {
      showIcon: true,
    },
  }
);

export default createAppContainer(AppNavigator);