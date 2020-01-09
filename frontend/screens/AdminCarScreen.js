import React from 'react';
import { Alert, View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import store from '../_store/store';
import { connect } from 'react-redux';
import { carDelete } from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';
import axios from 'axios';
import LicensePlate from '../_components/LicensePlate';

class AdminCarScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDelete = car => {
        Alert.alert(
            `Usuwanie Pojazdu`,
            `Czy napewno chcesz usunąć pojazd ${car.name} o numerze rejestracyjnym ${car.licensePlate}?`,
            [
                {
                    text: 'Anuluj',
                    style: 'cancel',
                },
                {
                    text: 'Usuń',
                    onPress: () => this.props.carDelete(car.vin)
                 },
            ],
            { cancelable: false },
        )

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={() => NavigationService.navigate('Admin')}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Zarządzanie Pojazdami</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList data={this.props.cars} style={{ flex: 1 }}
                        renderItem={({ item }) => (
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3' }}>
                                <View style={{ padding: 15 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                    <LicensePlate value={item.licensePlate} />
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Pojemność silnika: {item.engineSize} cm</Text>
                                        <Text style={{ fontSize: 10, lineHeight: 14 }}>3</Text>
                                    </View>
                                    <Text>Przebieg: {item.mileage} km</Text>
                                    <Text>Numer VIN: {item.vin}</Text>
                                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', right: 20, top: 10 }}>
                                    <View style={{ width: 32, height: 32, backgroundColor: '#f39c12', borderWidth: 1, borderColor: '#e67e22', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={0.5} onPress={() => NavigationService.navigate('AddEditCar', item)}>
                                                <Icon name='edit' size={28} color='#fff' />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginLeft: 15, width: 32, height: 32, backgroundColor: '#e74c3c', borderWidth: 1, borderColor: '#c0392b', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.handleDelete(item)}>
                                                <Icon name='delete-forever' size={28} color='#fff' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
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
        licensePlate: state.car.car.licensePlate
    };
}

const mapDispatchToProps = dispatch => ({
    carDelete: car => dispatch(carDelete(car))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminCarScreen);
