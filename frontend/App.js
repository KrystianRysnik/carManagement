/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import store from './_store/store';
import AppNavigator from './AppNavigator';
import NavigationService from './NavigationService';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <AppContainer
          ref={(navigatorRef) => {
            NavigationService.setNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
