/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';
import NavigationService from './NavigationService';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setNavigator(navigatorRef);
          }}
        />
    );
  }
}