import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Polyline, AnimatedRegion, Animated } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import KeepAwake from 'react-native-keep-awake';
import haversine from 'haversine';
import moment from 'moment';
import axios from 'axios';

let id = 0;

class MapScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: [],
            watchID: '',
            distance: 0,
            isTracking: false,
            startTrace: '',
            stopTrace: ''
        }
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.state.watchID)
    }

    startTracking = () => {
        if (this.props.vin) {
            const watchID = Geolocation.watchPosition((position) => {
                let distance = 0;
                if (this.state.previousCoordinate) {
                    distance = this.state.distance + haversine(this.state.previousCoordinate, position.coords)
                    this.setState({ distance: distance })
                }

                this.setState({
                    markers: [
                        ...this.state.markers, {
                            coordinate:
                            {
                                'longitude': position.coords.longitude,
                                'latitude': position.coords.latitude
                            },
                            key: id++
                        }
                    ],
                    previousCoordinate: position.coords,
                    distance

                })
            }, null, { enableHighAccuracy: true, distanceFilter: 10, interval: 1000, fastestInterval: 1000 })
            this.setState({ watchID })
            this.setState({ startTrace: moment(new Date).toJSON() })
            this.setState({ isTracking: true })
        }
    }

    stopTracking = async () => {

        await this.setState({ stopTrace: moment(new Date).toJSON() })
        axios.post('https://car-management-backend.herokuapp.com/route/add', {
            userEmail: this.props.email,
            carVin: this.props.vin,
            startTrace: this.state.startTrace,
            stopTrace: this.state.stopTrace,
            distance: this.state.distance,
            markers: this.state.markers
        })
            .then(res => {
                console.log('🟢 Add Route Succesfull!')
                id = 0
                this.setState({ isTracking: false, markers: [], distance: 0 })
                Geolocation.clearWatch(this.state.watchID)
            })
            .catch(error => {
                console.log('🔴 Add Route Error!')
                console.log(error);
            })


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
                        <Text style={{ textAlign: 'center' }}>{this.state.isTracking == false ? 'START' : 'STOP'} [{this.props.licensePlate == null ? 'no car selected' : this.props.licensePlate}]</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: '#fff', width: '100%', paddingVertical: 15, position: 'absolute', bottom: 0 }}>
                    <Text style={{ textAlign: 'center' }}>Distance: {parseFloat(this.state.distance).toFixed(2)} km</Text>
                </View>
                <KeepAwake />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.user.currentUser.email,
        vin: state.car.currentCar.vin,
        licensePlate: state.car.currentCar.licensePlate
    };
}

export default connect(mapStateToProps)(MapScreen);