import React from 'react';
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';

export default class AdminAddEditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: {
                name: '',
                vin: '',
                mileage: '',
                licensePlate: '',
                engineSize: ''
            }
        }
    }

    componentDidUpdate(prevProps) {
        let item = this.props.navigation.state.params
        if (item != prevProps.navigation.state.params) {
            this.setState({
                car: {
                    name: `${item.name}`,
                    vin: `${item.vin}`,
                    mileage: `${item.mileage}`,
                    licensePlate: `${item.licensePlate}`,
                    engineSize: `${item.engineSize}`
                }
            })
        }
    }

    handleBack = () => {
        NavigationService.navigate('Admin')
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        {this.state.car.vin == '' ? (
                            <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Dodawanie Pojazdu</Text>
                        ) : (
                                <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Edytowanie Pojazdu</Text>
                            )}
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                        <Text style={{ color: '#000', marginTop: 15 }}>Nazwa samochodu</Text>
                        <TextInput
                            value={this.state.car.name}

                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <Text style={{ color: '#000', marginTop: 15 }}>Numer VIN</Text>
                        <TextInput
                            value={this.state.car.vin}

                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <Text style={{ color: '#000', marginTop: 15 }}>Tablica rejestracyjna</Text>
                        <TextInput
                            value={this.state.car.licensePlate}

                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <Text style={{ color: '#000', marginTop: 15 }}>Przebieg</Text>
                        <TextInput
                            value={this.state.car.mileage}

                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <Text style={{ color: '#000', marginTop: 15 }}>Pojemność silnika</Text>
                        <TextInput
                            value={this.state.car.engineSize}

                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        {this.state.car.vin == '' ? (
                            <Button title="DODAJ POJAZD" color='#2ecc71' onPress={() => console.log('//TODO: Add car')} />
                        ) : (
                                <Button title="EDYTUJ POJAZD" color='#2ecc71' onPress={() => console.log('//TODO: Update car')} />
                            )}
                    </View>
                </ScrollView>
            </View>
        );
    }
}