import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import store from '../_store/store';
import { connect } from 'react-redux';
import { carSelect } from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';
import axios from 'axios';
import LicensePlate from '../_components/LicensePlate';

class CarScreen extends React.Component {
    static navigationOptions = {
        drawerIcon: (
            <Icon name='directions-car' size={24} color='#000' />
        )
    }

    handleBack = () => {
        NavigationService.goBack()
    }

    handleSelect = car => {
        this.props.carSelect(car)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Cars</Text>
                    </TouchableOpacity>
                    <Text style={{ paddingHorizontal: 10, lineHeight: 45, fontSize: 10, color: '#8f8f8f', textTransform: 'uppercase' }}>Selected car: <Text style={{ fontWeight: 'bold' }}>{this.props.licensePlate}</Text></Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList data={this.props.cars} style={{ flex: 1 }}
                        renderItem={({ item }) => (
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3' }}>
                                <TouchableOpacity style={{ padding: 15 }} onPress={() => this.handleSelect(item)}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.name} <Text style={{ color: '#39e600' }}>{this.props.licensePlate == item.licensePlate ? '[ SELECTED ]' : ''}</Text></Text>
                                    <LicensePlate value={item.licensePlate}/>
                                    <Text>Mileage: {item.mileage} km</Text>
                                    <Text>VIN number: {item.vin}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item => item.vin)}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        cars: state.car.cars,
        licensePlate: state.car.currentCar.licensePlate
    };
}

const mapDispatchToProps = dispatch => ({
    carSelect: car => dispatch(carSelect(car))
})

export default connect(mapStateToProps, mapDispatchToProps)(CarScreen);
