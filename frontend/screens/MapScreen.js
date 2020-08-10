import React from 'react';
import {connect} from 'react-redux';
import {routeAdd, carUpdate} from '../_actions';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

let id = 0

class MapScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            markers: [],
            watchID: '',
            distance: 0,
            purpose: '',
            isTracking: false,
            startTrace: '',
            stopTrace: '',
            diffTime: '',
            modalVisible: false,
            btnDisabled: true,
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
        this.setState({ modalVisible: true })
    }

    saveModal = () => {
        this.setState({ modalVisible: false })
        this.startTracking()
    }

    closeModal = () => {
        this.setState({ modalVisible: false })
        this.setState({ purpose: '' })
    }

    handlePurposeChange = async purpose => {
        await this.setState({ purpose: purpose })
        if (this.state.purpose != '') {
            this.setState({ btnDisabled: false })
        } else {
            this.setState({ btnDisabled: true })
        }
    }

    startTracking = () => {
        if (!this.props.vin) {
            ToastAndroid.showWithGravityAndOffset(
                'Zanim pojedziesz Wybierz samochód',
                ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
            )
        }
        else if (!this.state.purpose) {
            ToastAndroid.showWithGravityAndOffset(
                'Cel wyjazdu jest wymagany',
                ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
            )
        }
        else {
            const watchID = Geolocation.watchPosition((position) => {
                let distance = 0
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
            this.setState({
                watchID,
                startTrace: moment(new Date).toJSON(),
                isTracking: true
            })
            this.interval = setInterval(() => this.setState({ diffTime: moment().diff(moment(this.state.startTrace)) }), 1000)
        }
    }

    stopTracking = async () => {
        await this.setState({ stopTrace: moment(new Date).toJSON() })
        await this.props.carUpdate({
            _id: this.props.car._id,
            name: this.props.car.name,
            vin: this.props.car.vin,
            mileage: parseInt(this.props.car.mileage) + parseInt(this.state.distance),
            licensePlate: this.props.car.licensePlate,
            engineSize: this.props.car.engineSize
        })
        await this.props.routeAdd(this.state, this.props.user, this.props.vin)
        setTimeout(() => {
            if (this.props.error.add == true) {
                ToastAndroid.showWithGravityAndOffset(
                    'Wystąpił błąd podczas dodawania trasy',
                    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
                )
            }
            else {
                id = 0
                this.setState({
                    isTracking: false,
                    markers: [],
                    diffTime: '',
                    distance: 0
                })
                Geolocation.clearWatch(this.state.watchID)
                clearInterval(this.interval)
                ToastAndroid.showWithGravityAndOffset(
                    'Pomyślnie dodano trase',
                    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
                );
            }
        }, 500)
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
                }
                this.setState({
                    initialRegion: region
                })
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        )
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

                <View style={styles.navigationBtn}>
                    <TouchableOpacity onPress={this.handleNavigation}>
                        <Icon name='menu' size={28} color='#888888' />
                    </TouchableOpacity>
                </View>

                <View style={styles.locationBtn}>
                    <TouchableOpacity onPress={this.handleMyLocation}>
                        <Icon name='my-location' size={28} color='#888888' />
                    </TouchableOpacity>
                </View>

                <View style={styles.licensePlate} >
                    <TouchableOpacity onPress={() => NavigationService.navigate('Car')}>
                        <LicensePlate value={this.props.licensePlate ? this.props.licensePlate : 'NO CAR'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.traceBtn}>
                    {!this.state.isTracking ? (
                        <Button title='START' color='#2ecc71' onPress={this.openModal} />
                    ) : (
                            <Button title='ZATRZYMAJ I WYŚLIJ' color='#e74c3c' onPress={this.handleStop} />
                        )}
                </View>

                <View style={styles.details}>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.detailsSubheading}>DYSTANS</Text>
                        <Text style={styles.detailsHeading}>{parseFloat(this.state.distance).toFixed(2)} km</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.detailsSubheading}>CZAS TRWANIA</Text>
                        <Text style={styles.detailsHeading}>{this.state.diffTime ? moment(this.state.diffTime).utc().format('HH:mm:ss') : '00:00:00'}</Text>
                    </View>
                </View>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}
                    presentationStyle={'overFullScreen'}
                    transparent>
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.modalTitle}>Podaj cel wyjazdu:</Text>
                            <TextInput multiline
                                numberOfLines={4}
                                value={this.state.purpose}
                                onChangeText={this.handlePurposeChange}
                                style={styles.textArea} />
                            <View style={styles.row}>
                                <View style={{ width: '45%' }}>
                                    <Button title="Zapisz" color='#2ecc71' onPress={() => this.saveModal()} disabled={this.state.btnDisabled} />
                                </View>
                                <View style={{ width: '45%' }}>
                                    <Button title="Zamknij" color='#e74c3c' onPress={() => this.closeModal()} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <KeepAwake />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.route.error,
        user: state.user.user,
        car: state.car.car,
        vin: state.car.car.vin,
        licensePlate: state.car.car.licensePlate
    }
}

const mapDispatchToProps = dispatch => ({
    routeAdd: (data, user, vin) => dispatch(routeAdd(data, user, vin)),
    carUpdate: (car) => dispatch(carUpdate(car))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    innerContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 25,
        width: '80%'
    },
    modalTitle: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textArea: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    traceBtn: {
        width: '90%',
        position: 'absolute',
        bottom: 100,
        left: '5%'
    },
    navigationBtn: {
        backgroundColor: '#Fff',
        width: 48,
        height: 48,
        position: 'absolute',
        top: 20,
        left: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#b6b6b6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationBtn: {
        backgroundColor: '#Fff',
        width: 48, height: 48,
        position: 'absolute',
        top: 20,
        right: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#b6b6b6',
        alignItems: 'center',
        justifyContent: 'center'
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
    licensePlate: {
        width: '100%',
        position: 'absolute',
        top: 24, flex: 1,
        alignItems: 'center'
    }
})