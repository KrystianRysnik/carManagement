import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import MapView, { Polyline } from 'react-native-maps'
import { connect } from 'react-redux'
import { routeGet } from '../_actions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../NavigationService'
import moment from 'moment'

class RouteMapScreen extends React.Component {
    constructor(props) {
        super(props)
        this.mapRef = null
    }

    componentDidMount() {
        let item = this.props.navigation.state.params
        this.props.routeGet(item._id)
    }

    componentDidUpdate(prevProps) {
        let item = this.props.navigation.state.params
        if (item != prevProps.navigation.state.params) {
            this.props.routeGet(item._id)
        }
    }

    handleBack = () => {
        NavigationService.navigate('Routes')
    }

    render() {
        const { route } = this.props

        return (
            <View style={{ flex: 1 }}>
                {route.markers != undefined ? (
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
                ) : (
                       <ActivityIndicator size={'large'} />
                    )}


                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerTouchable} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={styles.headerTitle}>Traza z {moment(route.startTrace).format('DD/MM/YYYY')} </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.details}>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.detailsSubheading}>DYSTANS</Text>
                        <Text style={styles.detailsHeading}>{parseFloat(route.distance).toFixed(2)} km</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.detailsSubheading}>CZAS TRWANIA</Text>
                        <Text style={styles.detailsHeading}>{moment(moment(route.stopTrace).diff(moment(route.startTrace))).utc().format('HH:mm:ss')}</Text>
                    </View>
                </View>
            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        route: state.route.route
    }
}

const mapDispatchToProps = dispatch => ({
    routeGet: id => dispatch(routeGet(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(RouteMapScreen)

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