import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Polyline } from 'react-native-maps'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../NavigationService'
import moment from 'moment'

export default class RouteMapScreen extends React.Component {
    constructor(props) {
        super(props)
        this.mapRef = null
    }

    handleBack = () => {
        NavigationService.navigate('Routes')
    }

    render() {
        const route = this.props.navigation.state.params.item

        return (
            <View style={{ flex: 1 }}>
                <MapView style={{ ...StyleSheet.absoluteFillObject }}
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    rotateEnabled={false}
                    showsCompass={false}
                    ref={(ref) => { this.mapRef = ref }}
                    onLayout={() => this.mapRef.fitToCoordinates(route.markers.map((marker) => marker.coordinate), { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })}>
                    <Polyline
                        coordinates={route.markers.map((marker) => marker.coordinate)}
                        strokeWidth={5} />
                </MapView>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerTouchable} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={styles.headerTitle}>Traza z {moment(route.startTrace).format('DD/MM/YYYY, HH:mm')} </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.details}>
                    <View style={{width: '50%'}}>
                        <Text style={styles.detailsSubheading}>DYSTANS</Text>
                        <Text style={styles.detailsHeading}>{parseFloat(route.distance).toFixed(2)} km</Text>
                    </View>
                    <View style={{width: '50%'}}>
                        <Text style={styles.detailsSubheading}>CZAS TRWANIA</Text>
                        <Text style={styles.detailsHeading}>{moment(moment(route.stopTrace).diff(moment(route.startTrace))).format('HH:mm:ss')}</Text>
                    </View>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTouchable: {
        paddingHorizontal: 10,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        marginLeft: 15,
        fontWeight: 'bold'
    },
    details: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row'
    },
    detailsSubheading: {
        textAlign: 'center',
        fontSize: 12
    },
    detailsHeading: {
        textAlign: 'center',
        fontSize: 24
    },
})