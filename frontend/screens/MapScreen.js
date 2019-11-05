import React from 'react';
import { View, Text, Button } from 'react-native';
import MapView from 'react-native-maps';

export default class MapScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView style={{ flex: 1 }}></MapView>
            </View>
        );
    }
}