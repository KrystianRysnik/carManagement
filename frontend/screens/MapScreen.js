import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class MapScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView style={{ ...StyleSheet.absoluteFillObject }}
                showsUserLocation
                followsUserLocation >

                </MapView>
            </View>
        );
    }
}