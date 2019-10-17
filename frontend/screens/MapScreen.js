import React from 'react';
import { View, Text, Button } from 'react-native';
import MapView from 'react-native-maps';

export default class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
      };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <MapView style={{ flex: 1 }}></MapView>
            </View>
        );
    }
}