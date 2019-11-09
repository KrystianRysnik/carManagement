import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import store from '../_store/store';
import { connect } from 'react-redux';
import { carSelect } from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';
import axios from 'axios';

class CarScreen extends React.Component {
    state = {
        cars: []
    }

    carsList = () => {
        axios.get('http://192.168.0.19:3000/car/list')
            .then(res => {
                console.log('🟢 List Cars Succesfull!')
                this.setState({ cars: res.data })
            })
            .catch(error => {
                console.log('🔴 List Cars Error!')
                console.log(error)
            })
    }

    componentDidMount() {
        this.carsList()
    }

    handleBack = () => {
        NavigationService.goBack()
    }

    handleSelect = car => {
        this.props.carSelect(car)
    }

    render() {
        const { cars } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Cars</Text>
                    </TouchableOpacity>
                    <Text style={{ paddingHorizontal: 10, lineHeight: 45, fontSize: 10, color: '#8f8f8f', textTransform: 'uppercase' }}>{store.getState().car.currentCar.carRegistration}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList data={cars} style={{ flex: 1 }}
                        renderItem={({ item }) => (
                            <View style={{ borderBottomWidth: 1 }}>
                                <TouchableOpacity style={{ padding: 15 }} onPress={() => this.handleSelect(item)}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                    <Text>License plate: {item.licensePlate}</Text>
                                    <Text>Mileage: {item.mileage}</Text>
                                    <Text>VIN number: {item.vin}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    carSelect: car => dispatch(carSelect(car))
})

export default connect(null, mapDispatchToProps)(CarScreen);
