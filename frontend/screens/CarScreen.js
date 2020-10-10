import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {carSelect} from '../_actions';
import NavigationService from '../NavigationService';
import LicensePlate from '../_components/LicensePlate';

class CarScreen extends React.Component {
  handleBack = () => {
    NavigationService.goBack();
  };

  handleSelect = (car) => {
    this.props.carSelect(car);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerTouchable}
            onPress={this.handleBack}>
            <Icon name="keyboard-backspace" size={24} color="#000" />
            <Text style={styles.headerTitle}>Lista Samochodów</Text>
          </TouchableOpacity>
          <Text style={styles.headerSubtitle}>
            Wybrany samochód:{' '}
            <Text style={{fontWeight: 'bold'}}>{this.props.licensePlate}</Text>
          </Text>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={this.props.cars}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                <TouchableOpacity
                  style={{padding: 15}}
                  onPress={() => this.handleSelect(item)}>
                  <Text style={{fontWeight: 'bold'}}>
                    {item.name}{' '}
                    <Text style={{color: '#39e600'}}>
                      {this.props.licensePlate === item.licensePlate
                        ? '[ WYBRANY ]'
                        : ''}
                    </Text>
                  </Text>
                  <LicensePlate value={item.licensePlate} />
                  <View style={{flexDirection: 'row'}}>
                    <Text>Pojemność silnika: {item.engineSize} cm</Text>
                    <Text style={{fontSize: 10, lineHeight: 14}}>3</Text>
                  </View>
                  <Text>Przebieg: {item.mileage} km</Text>
                  <Text>Numer VIN: {item.vin}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.vin}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.car.cars,
    licensePlate: state.car.car.licensePlate,
  };
};

const mapDispatchToProps = (dispatch) => ({
  carSelect: (car) => dispatch(carSelect(car)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarScreen);

CarScreen.propTypes = {
  carSelect: PropTypes.func.isRequired,
  licensePlate: PropTypes.string,
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      licensePlate: PropTypes.string,
      vin: PropTypes.string,
      mleage: PropTypes.number,
      engineSize: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
};

CarScreen.defaultProps = {
  licensePlate: null,
};

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
  headerSubtitle: {
    paddingHorizontal: 10,
    lineHeight: 45,
    fontSize: 10,
    color: '#8f8f8f',
    textTransform: 'uppercase',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
});
