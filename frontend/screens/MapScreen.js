import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MapScreen extends React.Component {
    handleNavigation = () => {
        this.props.navigation.toggleDrawer()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView style={{ ...StyleSheet.absoluteFillObject }}
                showsUserLocation={true}
                followsUserLocation={true}
                rotateEnabled={false} >

                </MapView>
                <View style={{ backgroundColor: '#Fff', width: 48, height: 48, top: 20, left: 20, borderRadius: 24, borderWidth: 1, borderColor: '#b6b6b6', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.handleNavigation}>
                        <Icon name='menu' size={28} color='#888888' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}