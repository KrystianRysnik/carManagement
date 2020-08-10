import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {carAdd, carUpdate} from '../_actions';
import NavigationService from '../NavigationService';
import Input from '../_components/Input';

class AdminCarCuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      vin: '',
      mileage: '',
      licensePlate: '',
      engineSize: '',
      disableButton: true,
    };
  }

  componentDidMount() {
    const item = this.props.navigation.state.params;
    this.setState({
      _id: `${item._id}`,
      name: `${item.name}`,
      vin: `${item.vin}`,
      mileage: `${item.mileage}`,
      licensePlate: `${item.licensePlate}`,
      engineSize: `${item.engineSize}`,
      disableButton: true,
    });
  }

  componentDidUpdate(prevProps) {
    const item = this.props.navigation.state.params;
    if (item !== prevProps.navigation.state.params) {
      this.setState({
        _id: `${item._id}`,
        name: `${item.name}`,
        vin: `${item.vin}`,
        mileage: `${item.mileage}`,
        licensePlate: `${item.licensePlate}`,
        engineSize: `${item.engineSize}`,
        disableButton: true,
      });
    }
  }

  handleBack = () => {
    NavigationService.navigate('Admin');
  };

  checkDifferences = () => {
    const item = this.props.navigation.state.params;
    if (
      (this.state.name === item.name &&
        this.state.vin === item.vin &&
        this.state.mileage === item.mileage.toString() &&
        this.state.licensePlate === item.licensePlate &&
        this.state.engineSize === item.engineSize.toString()) ||
      this.state.name === '' ||
      this.state.vin === '' ||
      this.state.mileage === '' ||
      this.state.licensePlate === '' ||
      this.state.engineSize === ''
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
      () => this.checkDifferences()
    );
  };

  handleCreate = async () => {
    await this.props.carAdd(this.state);
    if (this.props.error.add == true) {
      ToastAndroid.showWithGravityAndOffset(
        'Wystąpił błąd podczas dodawania pojazdu',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Pomyślnie dodano pojazd',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
      this.setState({disableButton: true});
    }
  };

  handleUpdate = async () => {
    await this.props.carUpdate(this.state);
    if (this.props.error.update == true) {
      ToastAndroid.showWithGravityAndOffset(
        'Wystąpił błąd podczas aktualizacji pojazdu',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Pomyślnie zaktualizowano pojazd',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
      this.setState({disableButton: true});
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerTouchable}
            onPress={this.handleBack}>
            <Icon name="keyboard-backspace" size={24} color="#000" />
            {this.props.navigation.state.params.vin == '' ? (
              <Text style={styles.headerTitle}>Dodawanie Pojazdu</Text>
            ) : (
              <Text style={styles.headerTitle}>Edytowanie Pojazdu</Text>
            )}
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <Input
              name="Nazwa samochodu"
              value={this.state.name}
              onChangeFn={(value) => this.handleChange('name', value)}
            />
            <Input
              name="Numer VIN"
              value={this.state.vin}
              onChangeFn={(value) => this.handleChange('vin', value)}
            />
            <Input
              name="Tablica rejestracyjna"
              value={this.state.licensePlate}
              onChangeFn={(value) => this.handleChange('licensePlate', value)}
            />
            <Input
              name="Przebieg"
              value={this.state.mileage}
              onChangeFn={(value) => this.handleChange('mileage', value)}
            />
            <Input
              name="Pojemność silnika"
              value={this.state.engineSize}
              onChangeFn={(value) => this.handleChange('engineSize', value)}
            />
          </View>
          <View style={styles.container}>
            {this.props.navigation.state.params.vin == '' ? (
              <Button
                title="DODAJ POJAZD"
                color="#2ecc71"
                onPress={this.handleCreate}
                disabled={this.state.disableButton}
              />
            ) : (
              <Button
                title="EDYTUJ POJAZD"
                color="#2ecc71"
                onPress={this.handleUpdate}
                disabled={this.state.disableButton}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.car.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  carAdd: (car) => dispatch(carAdd(car)),
  carUpdate: (car) => dispatch(carUpdate(car)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCarCuScreen);

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
  input: {
    paddingVertical: 5,
    color: '#000',
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  inputLabel: {
    marginTop: 20,
    color: '#000',
  },
});
