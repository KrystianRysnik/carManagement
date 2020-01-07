import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Modal, TouchableHighlight, Alert, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import NavigationService from '../NavigationService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import KeepAwake from 'react-native-keep-awake';
import haversine from 'haversine';
import moment from 'moment';
import axios from 'axios';
import LicensePlate from '../_components/LicensePlate';

let id = 0;

class MapScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: [],
            watchID: '',
            distance: 0,
            purpose: '',
            isTracking: false,
            startTrace: '',
            stopTrace: '',
            diffTime: '',
            modalVisible: false
        }
    }

    componentDidMount() {
        this.handleMyLocation()
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.state.watchID)
        clearInterval(this.interval)
    }

    openModal = () => {
        this.setState({ modalVisible: true });
    }

    saveModal = () => {
        this.setState({ modalVisible: false });
        this.startTracking();
    }

    closeModal = () => {
        this.setState({ modalVisible: false });
        this.setState({ purpose: '' })
    }

    handlePurposeChange = purpose => {
        this.setState({ purpose: purpose })
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
            this.interval = setInterval(() => this.setState({ diffTime: moment().diff(moment(this.state.startTrace)) }), 1000)
        }
    }

    stopTracking = async () => {
        await this.setState({ stopTrace: moment(new Date).toJSON() })
        axios.post('https://car-management-backend.herokuapp.com/route/add', {
            carVin: this.props.vin,
            startTrace: this.state.startTrace,
            stopTrace: this.state.stopTrace,
            distance: this.state.distance,
            purpose: this.state.purpose,
            driver: {
                email: this.props.currentUser.email,
                firstName: this.props.currentUser.firstName,
                lastName: this.props.currentUser.lastName
            },
            markers: this.state.markers
        })
            .then(res => {
                console.log('🟢 Add Route Succesfull!')
                id = 0
                this.setState({ isTracking: false, markers: [], distance: 0 })
                Geolocation.clearWatch(this.state.watchID)
                clearInterval(this.interval)
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
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004
                };
                this.setState({
                    initialRegion: region
                });
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    handleStop = () => {
        Alert.alert(
            `Czy napewno...`,
            `chcesz zatrzymać proces śledzenia trasy i wysłać dane do bazy?`,
            [
                {
                    text: 'Nie',
                    style: 'cancel',
                },
                {
                    text: 'Tak',
                    onPress: () => this.stopTracking()
                 },
            ],
            { cancelable: false },
        )

    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView style={{ ...StyleSheet.absoluteFillObject }}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    rotateEnabled={false}
                    showsCompass={false}
                    initialRegion={this.state.initialRegion}
                    region={this.state.initialRegion}
                    onUserLocationChange={this.handleMyLocation}>
                    <Polyline
                        coordinates={this.state.markers.map((marker) => marker.coordinate)}
                        strokeWidth={5} />
                </MapView>

                <Modal
                    visible={this.state.modalVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}
                    presentationStyle={'overFullScreen'}
                    transparent>
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Podaj cel wyjazdu:</Text>
                            <TextInput multiline
                                numberOfLines={4}
                                value={this.state.purpose}
                                onChangeText={this.handlePurposeChange}
                                style={{ borderColor: 'gray', borderWidth: 1, width: '100%', marginVertical: 10 }}></TextInput>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '45%' }}>
                                    <Button
                                        onPress={() => this.saveModal()}
                                        title="Zapisz"
                                        color='#2ecc71'
                                    />
                                </View>
                                <View style={{ width: '45%' }}>
                                    <Button
                                        onPress={() => this.closeModal()}
                                        title="Zamknij"
                                        color='#e74c3c'
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={{ width: '100%', position: 'absolute', bottom: 100 }}>
                    <View style={{ paddingHorizontal: 20 }}>
                        {!this.state.isTracking ? (
                            <Button title='START' color='#2ecc71' onPress={this.openModal} />
                        ) : (
                                <Button title='ZATRZYMAJ I WYŚLIJ' color='#e74c3c' onPress={this.handleStop} />
                            )}
                    </View>
                </View>



                <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '100%', paddingVertical: 15, position: 'absolute', bottom: 0, flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ textAlign: 'center', fontSize: 12 }}>DYSTANS {this.state.purpose}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 24 }}>{parseFloat(this.state.distance).toFixed(2)} km</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={{ textAlign: 'center', fontSize: 12 }}>CZAS TRWANIA</Text>
                        <Text style={{ textAlign: 'center', fontSize: 24 }}>{this.state.diffTime ? moment(this.state.diffTime).format('HH:mm:ss') : '00:00:00'}</Text>
                    </View>
                </View>

                <View style={{ position: 'absolute', top: 24, flex: 1, width: '100%', alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => NavigationService.navigate('Car')}>
                        <LicensePlate value={this.props.licensePlate ? this.props.licensePlate : 'NO CAR'} />
                    </TouchableOpacity>
                </View>

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
                <KeepAwake />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    innerContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 25,
        width: '80%',
    },
});

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        vin: state.car.currentCar.vin,
        licensePlate: state.car.currentCar.licensePlate
    };
}

export default connect(mapStateToProps)(MapScreen);