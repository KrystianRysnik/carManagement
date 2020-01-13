import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import LoadingScreen from './screens/LoadingScreen'

import SignInScreen from './screens/SignInScreen'
import SigunUpScreen from './screens/SignUpScreen'

import MapScreen from './screens/MapScreen'
import CarScreen from './screens/CarScreen'
import ProfileScreen from './screens/ProfileScreen'
import RouteScreen from './screens/RouteScreen'
import RouteMapScreen from './screens/RouteMapScreen'
import ReportScreen from './screens/ReportScreen'
import AdminScreen from './screens/AdminScreen'
import AdminCarScreen from './screens/AdminCarScreen'
import AdminCarCuScreen from './screens/AdminCarCuScreen'
import AdminUserScreen from './screens/AdminUserScreen'
import AdminUserCuScreen from './screens/AdminUserCuScreen'
import AdminRouteScreen from './screens/AdminRouteScreen'
import AdminRouteCuScreen from './screens/AdminRouteCuScreen'

import { ScrollView } from 'react-native-gesture-handler'

import Hidden from './_components/Hidden'
import Header from './_components/Header'
import AdminBtn from './_components/AdminBtn'

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SigunUpScreen
  },
  {
    headerMode: 'none'
  }
)

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
        drawerLabel: 'Lista Samochodów',
        drawerIcon: (
          <Icon name='directions-car' size={24} color='#000' />
        )
      }
    },
    Routes: {
      screen: RouteScreen,
      navigationOptions: {
        drawerLabel: 'Historia Tras',
        drawerIcon: (
          <Icon name='history' size={24} color='#000' />
        )
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
        drawerLabel: 'Generowanie Raportu',
        drawerIcon: (
          <Icon name='picture-as-pdf' size={24} color='#000' />
        )
      }
    },
    Admin: {
      screen: AdminScreen,
      navigationOptions: {
        drawerLabel: <AdminBtn />
      }
    },
    AdminCar: {
      screen: AdminCarScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },
    AddEditCar: {
      screen: AdminCarCuScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },
    AdminUser: {
      screen: AdminUserScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },
    AddEditUser: {
      screen: AdminUserCuScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },
    AdminRoute: {
      screen: AdminRouteScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },
    EditRoute: {
      screen: AdminRouteCuScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
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
)