import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoadingScreen from './screens/LoadingScreen';

import SignInScreen from './screens/SignInScreen';
import SigunUpScreen from './screens/SignUpScreen';

import MapScreen from './screens/MapScreen';
import CarScreen from './screens/CarScreen';
import ProfileScreen from './screens/ProfileScreen';
import RouteScreen from './screens/RouteScreen';
import RouteMapScreen from './screens/RouteMapScreen';
import ReportScreen from './screens/ReportScreen';

import { ScrollView } from 'react-native-gesture-handler';

import Hidden from './_components/Hidden'
import Header from './_components/Header'

import store from './_store/store';
import NavigationService from './NavigationService';




const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SigunUpScreen
  },
  {
    headerMode: 'none'
  }
);

const CustomDrawer = (props) => (
  <View style={{ flex: 1 }}>
    <Header />
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </View>
)

const AppDrawer = createDrawerNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },
    Car: {
      screen: CarScreen,
      navigationOptions: {
        drawerLabel: 'Lista Samochodów'
      }
    },
    Routes: {
      screen: RouteScreen,
      navigationOptions: {
        drawerLabel: 'Historia Tras'
      }
    },
    RouteMap: {
      screen: RouteMapScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },
    Report: {
      screen: ReportScreen,
      navigationOptions: {
        drawerLabel: 'Generowanie Raportu'
      }
    }
  },
  {
    initialRouteName: 'Map',
    contentComponent: CustomDrawer
  }
)

export default createAppContainer(
  createStackNavigator(
    {
      Loading: LoadingScreen,
      App: AppDrawer,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Loading',
      headerMode: 'none'
    }
  )
);