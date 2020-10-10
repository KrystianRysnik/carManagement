import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {ScrollView} from 'react-native-gesture-handler';
import LoadingScreen from './screens/LoadingScreen';

import SignInScreen from './screens/SignInScreen';
import SigunUpScreen from './screens/SignUpScreen';

import MapScreen from './screens/MapScreen';
import CarScreen from './screens/CarScreen';
import ProfileScreen from './screens/ProfileScreen';
import RouteScreen from './screens/RouteScreen';
import RouteMapScreen from './screens/RouteMapScreen';
import ReportScreen from './screens/ReportScreen';
import AdminScreen from './screens/AdminScreen';
import AdminCarScreen from './screens/AdminCarScreen';
import AdminCarCuScreen from './screens/AdminCarCuScreen';
import AdminUserScreen from './screens/AdminUserScreen';
import AdminUserCuScreen from './screens/AdminUserCuScreen';
import AdminRouteScreen from './screens/AdminRouteScreen';
import AdminRouteCuScreen from './screens/AdminRouteCuScreen';

import Header from './_components/Header';
import NavigationBtn from './_components/NavigationBtn';

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SigunUpScreen,
  },
  {
    headerMode: 'none',
  }
);

const CustomDrawer = (props) => (
  <View style={{flex: 1}}>
    <Header />
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </View>
);

const AppDrawer = createDrawerNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerLabel: <NavigationBtn />,
      },
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
        drawerLabel: <NavigationBtn />,
      },
    },
    Car: {
      screen: CarScreen,
      navigationOptions: {
        drawerLabel: 'Lista Samochodów',
        drawerIcon: <Icon name="directions-car" size={24} color="#000" />,
      },
    },
    Routes: {
      screen: RouteScreen,
      navigationOptions: {
        drawerLabel: 'Historia Tras',
        drawerIcon: <Icon name="history" size={24} color="#000" />,
      },
    },
    RouteMap: {
      screen: RouteMapScreen,
      navigationOptions: {
        drawerLabel: <NavigationBtn />,
      },
    },
    Report: {
      screen: ReportScreen,
      navigationOptions: {
        drawerLabel: (
          <NavigationBtn title="Generowanie Raportu" icon="picture-as-pdf" />
        ),
      },
    },
    Admin: {
      screen: AdminScreen,
      navigationOptions: {
        drawerLabel: (
          <NavigationBtn title="Panel Administratora" icon="security" />
        ),
      },
    },
    AdminCar: {
      screen: AdminCarScreen,
      navigationOptions: {
        drawerLabel: <NavigationBtn />,
      },
    },
    AddEditCar: {
      screen: AdminCarCuScreen,
      navigationOptions: {
        drawerLabel: <NavigationBtn />,
      },
    },
    AdminUser: {
      screen: AdminUserScreen,
      navigationOptions: {
        drawerLabel: <NavigationBtn />,
      },
    },
    AddEditUser: {
      screen: AdminUserCuScreen,
      navigationOptions: {
        drawerLabel: <NavigationBtn />,
      },
    },
    AdminRoute: {
      screen: AdminRouteScreen,
      navigationOptions: {
        drawerLabel: <NavigationBtn />,
      },
    },
    EditRoute: {
      screen: AdminRouteCuScreen,
      navigationOptions: {
        drawerLabel: <NavigationBtn />,
      },
    },
  },
  {
    initialRouteName: 'Map',
    contentComponent: CustomDrawer,
  }
);

export default createAppContainer(
  createStackNavigator(
    {
      Loading: LoadingScreen,
      App: AppDrawer,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
      headerMode: 'none',
    }
  )
);
