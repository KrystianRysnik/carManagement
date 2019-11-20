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
import SettingsScreen from './screens/SettingsScreen';
import { ScrollView } from 'react-native-gesture-handler';

import store from './_store/store';




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
            <Text style={{ textAlign: 'center', lineHeight: 50, color: '#ffffff', fontSize: 26, textTransform: 'uppercase' }}>{store.getState().user.currentUser.name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: 'bold' }}>{store.getState().user.currentUser.name}</Text>
            <Text style={{ color: '#ffffff', fontSize: 10 }}>Zobacz profil</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
    <ScrollView style={{ marginTop: -5}}>
      <DrawerItems {...props} />
    </ScrollView>
  </View>
)

const AppDrawer = createDrawerNavigator(
  {
    Profile: ProfileScreen,
    Map: MapScreen,
    Car: CarScreen,
    Routes: RouteScreen
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