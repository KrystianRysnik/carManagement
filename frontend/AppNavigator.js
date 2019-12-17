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
    <View>
      <ImageBackground source={require('./_assets/background.png')} style={{ width: '100%' }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ margin: 15, height: 50, width: 50, borderRadius: 25, backgroundColor: '#b6b6b6' }}>
            <Text style={{ textAlign: 'center', lineHeight: 50, color: '#ffffff', fontSize: 26, textTransform: 'uppercase' }}>FL</Text>
          </View>
          <View>
            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: 'bold' }}>Firstname Lastname</Text>
            <Text style={{ color: '#ffffff', fontSize: 10 }} onPress={() => NavigationService.navigate('Profile')}>Zobacz profil</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
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
        drawerLabel: 'Select Car'
      }
    },
    Routes: {
      screen: RouteScreen,
      navigationOptions: {
        drawerLabel: 'Routes History'
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
        drawerLabel: 'Generate Report'
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