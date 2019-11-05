import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoadingScreen from './screens/LoadingScreen';

import SignInScreen from './screens/SignInScreen';
import SigunUpScreen from './screens/SignUpScreen';

import MapScreen from './screens/MapScreen';
import CarScreen from './screens/CarScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';




const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SigunUpScreen
  },
  {
    headerMode: 'none'
  }
);

const AppStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Map: MapScreen,
    Car: CarScreen
  },
  {
    headerMode: 'none'
  }
)

export default createAppContainer(
  createStackNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Loading',
      headerMode: 'none'
    }
  )
);