import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Polyline, AnimatedRegion, Animated } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import KeepAwake from 'react-native-keep-awake';
import haversine from 'haversine';

let id = 0;

export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: [],
            watchID: '',
            distance: 0,
            isTracking: false,
        }
    }

    componentDidMount() {
       // this.handleMyLocation()
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.state.watchID)
    }

    startTracking = () => {
        const watchID = Geolocation.watchPosition((position) => {
            let distance = 0;
            console.log('h')
            if (this.state.previousCoordinate) {
                distance = this.state.distance + haversine(this.state.previousCoordinate, position.coords)
                this.setState({ distance: distance })
            }

            this.setState({
                markers: [
                    ...this.state.markers, {
                        coordinate: position.coords,
                        key: id++
                    }
                ],
                previousCoordinate: position.coords,
                distance

            })
        }, null, { enableHighAccuracy: true, distanceFilter: 10, interval: 1000, fastestInterval: 1000 })
        this.setState({ watchID })
        this.setState({ isTracking: true })
    }

    stopTracking = () => {
        console.log(this.state)
        id = 0
        this.setState({ isTracking: false,  markers: [], distance: 0 })
        Geolocation.clearWatch(this.state.watchID)
    }

    handleNavigation = () => {
        this.props.navigation.toggleDrawer()
    }

    handleMyLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                let region = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                };
                this.setState({
                    initialRegion: region
                });
                console.log(region)
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView style={{ ...StyleSheet.absoluteFillObject }}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    rotateEnabled={false} >
                    <Polyline
                        coordinates={this.state.markers.map((marker) => marker.coordinate)}
                        strokeWidth={5} />
                </MapView>
                <View style={{ backgroundColor: '#Fff', width: 48, height: 48, position: 'absolute', top: 20, left: 20, borderRadius: 24, borderWidth: 1, borderColor: '#b6b6b6', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.handleNavigation}>
                        <Icon name='menu' size={28} color='#888888' />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#Fff', width: 48, height: 48, position: 'absolute', top: 20, right: 20, borderRadius: 24, borderWidth: 1, borderColor: '#b6b6b6', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.handleMyLocation}>
                        <Icon name='my-location' size={28} color='#888888' />
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: '#Fff', width: 48, height: 48, position: 'absolute', top: 20, right: 20, borderRadius: 24, borderWidth: 1, borderColor: '#b6b6b6', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.handleMyLocation}>
                        <Icon name='my-location' size={28} color='#888888' />
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: '#fff', width: '100%', paddingVertical: 15, position: 'absolute', bottom: 55 }}>
                   <TouchableOpacity onPress={this.state.isTracking == false ? this.startTracking : this.stopTracking}>
        <Text style={{ textAlign: 'center' }}>{this.state.isTracking == false ? 'START' : 'STOP'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: '#fff', width: '100%', paddingVertical: 15, position: 'absolute', bottom: 0 }}>
                    <Text style={{ textAlign: 'center' }}>Distance: { parseFloat(this.state.distance).toFixed(2) } km</Text>
                </View>
                <KeepAwake />
            </View>
        );
    }
}