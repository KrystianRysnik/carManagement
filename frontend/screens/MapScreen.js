import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Button,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import KeepAwake from 'react-native-keep-awake';
import haversine from 'haversine';
import moment from 'moment';
import PropTypes from 'prop-types';
import NavigationService from '../NavigationService';
import {routeAdd, carUpdate} from '../_actions';
import LicensePlate from '../_components/LicensePlate';

let id = 0;

class MapScreen extends React.Component {
  state = {
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
  };

  componentDidMount() {
    this.handleMyLocation();
  }

  componentWillUnmount() {
    const {watchID} = this.state;
    Geolocation.clearWatch(watchID);
    clearInterval(this.interval);
  }

  openModal = () => {
    this.setState({modalVisible: true});
  };

  saveModal = () => {
    this.setState({modalVisible: false});
    this.startTracking();
  };

  closeModal = () => {
    this.setState({modalVisible: false});
    this.setState({purpose: ''});
  };

  handlePurposeChange = async (purpose) => {
    this.setState({purpose}, () => {
      const {purpose: statePurpose} = this.state;
      if (statePurpose !== '') {
        this.setState({btnDisabled: false});
      } else {
        this.setState({btnDisabled: true});
      }
    });
  };

  startTracking = () => {
    const {
      car: {vin},
    } = this.props;
    const {purpose, previousCoordinate, distance, markers} = this.state;
    if (!vin) {
      ToastAndroid.showWithGravityAndOffset(
        'Zanim pojedziesz Wybierz samochód',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else if (!purpose) {
      ToastAndroid.showWithGravityAndOffset(
        'Cel wyjazdu jest wymagany',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else {
      const watchID = Geolocation.watchPosition(
        (position) => {
          let distanceDiff = 0;
          if (previousCoordinate) {
            distanceDiff =
              distance + haversine(previousCoordinate, position.coords);
            this.setState({distance: distanceDiff});
          }

          this.setState({
            markers: [
              ...markers,
              {
                coordinate: {
                  longitude: position.coords.longitude,
                  latitude: position.coords.latitude,
                },
                key: id + 1,
              },
            ],
            previousCoordinate: position.coords,
            distance: distanceDiff,
          });
        },
        null,
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 1000,
          fastestInterval: 1000,
        }
      );
      this.setState({
        watchID,
        startTrace: moment().toJSON(),
        isTracking: true,
      });
      this.interval = setInterval(() => {
        this.setState((prevState) => ({
          diffTime: moment().diff(moment(prevState.startTrace)),
        }));
      }, 1000);
    }
  };

  stopTracking = async () => {
    const {
      routeAdd: propsRouteAdd,
      carUpdate: propsCarUpdate,
      error: {add: errorAdd},
      car: {_id, name, vin, mileage, licensePlate, engineSize},
      user,
    } = this.props;
    const {distance, watchID} = this.state;

    await this.setState({stopTrace: moment().toJSON()});
    await propsCarUpdate({
      _id,
      name,
      vin,
      mileage: parseInt(mileage, 10) + parseInt(distance, 10),
      licensePlate,
      engineSize,
    });
    await propsRouteAdd(this.state, user, vin);
    if (errorAdd === true) {
      ToastAndroid.showWithGravityAndOffset(
        'Wystąpił błąd podczas dodawania trasy',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else {
      id = 0;
      this.setState({
        isTracking: false,
        markers: [],
        diffTime: '',
        distance: 0,
      });
      Geolocation.clearWatch(watchID);
      clearInterval(this.interval);
      ToastAndroid.showWithGravityAndOffset(
        'Pomyślnie dodano trase',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    }
  };

  handleNavigation = () => {
    const {
      navigation: {toggleDrawer},
    } = this.props;
    toggleDrawer();
  };

  handleMyLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        };
        this.setState({
          initialRegion: region,
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };

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
          onPress: () => this.stopTracking(),
        },
      ],
      {cancelable: false}
    );
  };

  render() {
    const {
      car: {licensePlate},
    } = this.props;
    const {
      initialRegion,
      distance,
      markers,
      isTracking,
      diffTime,
      modalVisible,
      purpose,
      btnDisabled,
    } = this.state;

    return (
      <View style={{flex: 1}}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          showsUserLocation
          showsMyLocationButton={false}
          rotateEnabled={false}
          showsCompass={false}
          initialRegion={initialRegion}
          region={initialRegion}
          onUserLocationChange={this.handleMyLocation}>
          <Polyline
            coordinates={markers.map((marker) => marker.coordinate)}
            strokeWidth={5}
          />
        </MapView>

        <View style={styles.navigationBtn}>
          <TouchableOpacity onPress={this.handleNavigation}>
            <Icon name="menu" size={28} color="#888888" />
          </TouchableOpacity>
        </View>

        <View style={styles.locationBtn}>
          <TouchableOpacity onPress={this.handleMyLocation}>
            <Icon name="my-location" size={28} color="#888888" />
          </TouchableOpacity>
        </View>

        <View style={styles.licensePlate}>
          <TouchableOpacity onPress={() => NavigationService.navigate('Car')}>
            <LicensePlate value={licensePlate || 'NO CAR'} />
          </TouchableOpacity>
        </View>

        <View style={styles.traceBtn}>
          {!isTracking ? (
            <Button title="START" color="#2ecc71" onPress={this.openModal} />
          ) : (
            <Button
              title="ZATRZYMAJ I WYŚLIJ"
              color="#e74c3c"
              onPress={this.handleStop}
            />
          )}
        </View>

        <View style={styles.details}>
          <View style={{width: '50%'}}>
            <Text style={styles.detailsSubheading}>DYSTANS</Text>
            <Text style={styles.detailsHeading}>
              {parseFloat(distance).toFixed(2)} km
            </Text>
          </View>
          <View style={{width: '50%'}}>
            <Text style={styles.detailsSubheading}>CZAS TRWANIA</Text>
            <Text style={styles.detailsHeading}>
              {diffTime
                ? moment(diffTime).utc().format('HH:mm:ss')
                : '00:00:00'}
            </Text>
          </View>
        </View>
        <Modal
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => this.closeModal()}
          presentationStyle="overFullScreen"
          transparent>
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.modalTitle}>Podaj cel wyjazdu:</Text>
              <TextInput
                multiline
                numberOfLines={4}
                value={purpose}
                onChangeText={this.handlePurposeChange}
                style={styles.textArea}
              />
              <View style={styles.row}>
                <View style={{width: '45%'}}>
                  <Button
                    title="Zapisz"
                    color="#2ecc71"
                    onPress={() => this.saveModal()}
                    disabled={btnDisabled}
                  />
                </View>
                <View style={{width: '45%'}}>
                  <Button
                    title="Zamknij"
                    color="#e74c3c"
                    onPress={() => this.closeModal()}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <KeepAwake />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.route.error,
    user: state.user.user,
    car: state.car.car,
  };
};

const mapDispatchToProps = (dispatch) => ({
  routeAdd: (data, user, vin) => dispatch(routeAdd(data, user, vin)),
  carUpdate: (car) => dispatch(carUpdate(car)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

MapScreen.propTypes = {
  carUpdate: PropTypes.func.isRequired,
  routeAdd: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  car: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    vin: PropTypes.string,
    mileage: PropTypes.number,
    licensePlate: PropTypes.string,
    engineSize: PropTypes.number,
  }),
  error: PropTypes.shape({
    add: PropTypes.bool,
  }).isRequired,
  navigation: PropTypes.shape({
    toggleDrawer: PropTypes.func,
  }).isRequired,
};

MapScreen.defaultProps = {
  car: null,
};

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
  modalTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textArea: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  traceBtn: {
    width: '90%',
    position: 'absolute',
    bottom: 100,
    left: '5%',
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
    width: 48,
    height: 48,
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#b6b6b6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  detailsSubheading: {
    textAlign: 'center',
    fontSize: 12,
  },
  detailsHeading: {
    textAlign: 'center',
    fontSize: 24,
  },
  licensePlate: {
    width: '100%',
    position: 'absolute',
    top: 24,
    flex: 1,
    alignItems: 'center',
  },
});
