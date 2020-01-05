import React from 'react';
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { carAdd, carUpdate } from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';

class AdminAddEditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalVin: '',
            name: '',
            vin: '',
            mileage: '',
            licensePlate: '',
            engineSize: ''
        }
    }

    componentDidUpdate(prevProps) {
        let item = this.props.navigation.state.params
        if (item != prevProps.navigation.state.params) {
            this.setState({
                    originalVin: `${item.vin}`,
                    name: `${item.name}`,
                    vin: `${item.vin}`,
                    mileage: `${item.mileage}`,
                    licensePlate: `${item.licensePlate}`,
                    engineSize: `${item.engineSize}`
            })
        }
    }

    handleBack = () => {
        NavigationService.navigate('Admin')
    }

    handleNameChange = name => {
        this.setState({ name: name })
    }

    handleVinChange = vin => {
        this.setState({ vin: vin })
    }

    handleMileageChange = mileage => {
        this.setState({ mileage: mileage })
    }

    handleLicensePlateChange = licensePlate => {
        this.setState({ licensePlate: licensePlate })
    }

    handleEngineSizeChange = engineSize => {
        this.setState({ engineSize: engineSize })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        {this.props.navigation.state.params.vin == '' ? (
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
                            value={this.state.name}
                            onChangeText={this.handleNameChange}
                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <Text style={{ color: '#000', marginTop: 15 }}>Numer VIN</Text>
                        <TextInput
                            value={this.state.vin}
                            onChangeText={this.handleVinChange}
                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <Text style={{ color: '#000', marginTop: 15 }}>Tablica rejestracyjna</Text>
                        <TextInput
                            value={this.state.licensePlate}
                            onChangeText={this.handleLicensePlateChange}
                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <Text style={{ color: '#000', marginTop: 15 }}>Przebieg</Text>
                        <TextInput
                            value={this.state.mileage}
                            onChangeText={this.handleMileageChange}
                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <Text style={{ color: '#000', marginTop: 15 }}>Pojemność silnika</Text>
                        <TextInput
                            value={this.state.engineSize}
                            onChangeText={this.handleEngineSizeChange}
                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        {this.props.navigation.state.params.vin == '' ? (
                            <Button title="DODAJ POJAZD" color='#2ecc71' onPress={() => this.props.carAdd(this.state)} />
                        ) : (
                                <Button title="EDYTUJ POJAZD" color='#2ecc71' onPress={() => this.props.carUpdate(this.state)} />
                            )}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    carAdd: car => dispatch(carAdd(car)),
    carUpdate: car => dispatch(carUpdate(car))
})

export default connect(null, mapDispatchToProps)(AdminAddEditScreen);