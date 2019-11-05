import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <View style={{margin: 15, height: 50, width: 50, borderRadius: 25, backgroundColor: '#0000bb'}}>
        <Text style={{textAlign: 'center', lineHeight: 50, color: '#ffffff', fontSize: 26, textTransform: 'uppercase'}}>{store.getState().user.currentUser.name.charAt(0)}</Text>
      </View>
      <Text style={{marginHorizontal: 15, color: '#ffffff'}}>{store.getState().user.currentUser.name}</Text>
      <Text style={{marginHorizontal: 15, marginBottom: 15, color: '#ffffff', fontSize: 11}}>{store.getState().user.currentUser.email}</Text>
      </ImageBackground>
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </View>
)

const AppDrawer = createDrawerNavigator(
  {
    Profile: ProfileScreen,
    Map: MapScreen,
    Car: CarScreen
  },
  {
    contentComponent: CustomDrawer,
    headerMode: 'none'
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