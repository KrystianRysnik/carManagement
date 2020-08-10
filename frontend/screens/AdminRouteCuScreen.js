import React from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  Picker,
  Button,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import {routeGet, routeUpdate} from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';
import moment, {duration} from 'moment';
import Input from '../_components/Input';

class AdminRouteCuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      carVin: '',
      startTrace: '',
      stopTrace: '',
      duration: '',
      distance: '',
      purpose: '',
      driverEmail: '',
      driverFirstName: '',
      driverLastName: '',
      disableButton: true,
      showDateStart: false,
      showDateEnd: false,
      mode: 'date',
      isLoading: true,
    };
  }

  componentDidMount() {
    let item = this.props.navigation.state.params;
    this._refreshState(item._id);
  }

  componentDidUpdate(prevProps) {
    let item = this.props.navigation.state.params;
    if (item != prevProps.navigation.state.params) {
      this.setState({isLoading: true});
      this._refreshState(item._id);
    }
  }

  _refreshState = async (id) => {
    await this.props.routeGet(id, false);
    const {route} = this.props;
    this.setState({
      _id: route._id,
      carVin: route.carVin,
      startTrace: moment(route.startTrace).toDate(),
      stopTrace: moment(route.stopTrace).toDate(),
      duration: moment(moment(route.stopTrace).diff(moment(route.startTrace)))
        .utc()
        .format('HH:mm:ss')
        .toString(),
      distance: route.distance.toString(),
      purpose: route.purpose,
      driverEmail: route.driver.email,
      driverFirstName: route.driver.firstName,
      driverLastName: route.driver.lastName,
      disableButton: true,
      isLoading: false,
    });
  };

  handleBack = () => {
    NavigationService.navigate('Admin');
  };

  handleDriverEmailChange = (itemValue, itemIndex) => {
    this.setState({driverEmail: itemValue});
    this.props.users.forEach(
      (element) => {
        if (element.email == this.state.driverEmail) {
          this.setState({
            driverFirstName: element.firstName,
            driverLastName: element.lastName,
          });
        }
      },
      () => this.checkDifferences(),
    );
  };

  handleStartTraceChange = (event, date) => {
    let startTrace = date || this.state.startTrace;

    this.setState(
      {
        showDateStart: Platform.OS === 'ios' ? true : false,
        startTrace: startTrace,
      },
      () => this.checkDifferences(),
    );
  };

  handleVinChange = (itemValue, itemIndex) => {
    this.setState({carVin: itemValue}, () => this.checkDifferences());
  };

  checkDifferences = async () => {
    let item = await this.props.route;
    if (
      (this.state.driverEmail === item.driver.email &&
        this.state.carVin === item.carVin &&
        this.state.distance === item.distance.toString() &&
        this.state.purpose === item.purpose &&
        this.state.duration ===
          moment(moment(item.stopTrace).diff(moment(item.startTrace)))
            .utc()
            .format('HH:mm:ss')
            .toString() &&
        moment(this.state.startTrace).format('DD/MM/YYYY').toString() ===
          moment(item.startTrace).format('DD/MM/YYYY').toString()) ||
      this.state.duration === '' ||
      this.state.purpose === '' ||
      this.state.distance === '' ||
      !this.state.duration.match(/^[0-9]{2,}:[0-9]{2}:[0-9]{2}$/)
    )
      this.setState({disableButton: true});
    else this.setState({disableButton: false});
  };

  handleChange = (name, value) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        [name]: value,
      }),
      () => this.checkDifferences(),
    );
  };

  handleUpdate = async () => {
    let time = this.state.duration.split(':');
    this.setState({stopTrace: this.state.startTrace});
    this.setState({
      stopTrace: moment(this.state.stopTrace)
        .add({
          hours: parseInt(time[0]),
          minutes: parseInt(time[1]),
          seconds: parseInt(time[2]),
        })
        .toDate(),
    });
    await this.props.routeUpdate(this.state);
    if (this.props.error.update == true) {
      ToastAndroid.showWithGravityAndOffset(
        'Wystąpił błąd podczas aktualizacji trasy',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50,
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Pomyślnie zaktualizowano trase',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50,
      );
      this.setState({disableButton: true});
    }
  };

  render() {
    let carsList = this.props.cars.map((item, index) => {
      return (
        <Picker.Item
          label={`${item.licensePlate} - ${item.vin}`}
          key={item.vin}
          value={item.vin}
        />
      );
    });

    let usersList = this.props.users.map((item, index) => {
      return (
        <Picker.Item
          label={`${item.email} - ${item.firstName} ${item.lastName}`}
          key={item.email}
          value={item.email}
        />
      );
    });

    let {isLoading} = this.state;

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerTouchable}
            onPress={this.handleBack}>
            <Icon name="keyboard-backspace" size={24} color="#000" />
            <Text style={styles.headerTitle}>Edytowanie Trasy</Text>
          </TouchableOpacity>
        </View>
        {!isLoading ? (
          <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
              <Input
                pickerTag
                name="Numer Vin"
                value={this.state.carVin}
                onChangeFn={(value, index) =>
                  this.handleChange('carVin', value)
                }>
                {carsList}
              </Input>
              <View style={styles.separator}></View>
              <Input
                pickerTag
                name="Kierowca"
                value={this.state.driverEmail}
                onChangeFn={(value, index) =>
                  this.handleChange('driverEmail', value)
                }>
                {usersList}
              </Input>
              <View style={styles.separator}></View>
              <Text style={styles.inputLabel}>Data rozpoczęcia trasy</Text>
              <TouchableOpacity
                onPress={() => this.setState({showDateStart: true})}>
                <Text style={{padding: 8, fontSize: 16}}>
                  {moment(this.state.startTrace).format('DD.MM.YYYY')}
                </Text>
              </TouchableOpacity>
              <View style={styles.separator}></View>
              <Input
                name="Cel wyjazdu"
                value={this.state.purpose}
                onChangeFn={(value) => this.handleChange('purpose', value)}
              />
              <Input
                name="Czas trwania (hh:mm:ss)"
                value={this.state.duration}
                onChangeFn={(value) => this.handleChange('duration', value)}
              />
              <Input
                name="Dystans (km)"
                value={this.state.distance}
                onChangeFn={(value) => this.handleChange('distance', value)}
              />
            </View>
            <View style={styles.container}>
              <Button
                title="EDYTUJ TRASE"
                color="#2ecc71"
                onPress={this.handleUpdate}
                disabled={this.state.disableButton}
              />
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}>
            <ActivityIndicator size={'large'} />
            <Text>Pobieranie danych...</Text>
          </View>
        )}

        {this.state.showDateStart && (
          <DateTimePicker
            value={this.state.startTrace}
            mode={this.state.mode}
            display="default"
            onChange={this.handleStartTraceChange}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.route.error,
    cars: state.car.cars,
    users: state.user.users,
    route: state.route.route,
  };
};

const mapDispatchToProps = (dispatch) => ({
  routeGet: (id, withMarkers) => dispatch(routeGet(id, withMarkers)),
  routeUpdate: (route) => dispatch(routeUpdate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminRouteCuScreen);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTouchable: {
    paddingHorizontal: 10,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 15,
    fontWeight: 'bold',
  },
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#e3e3e3',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    color: '#000',
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  inputLabel: {
    marginTop: 20,
    color: '#000',
  },
});
