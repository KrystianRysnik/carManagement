import React from 'react';
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { carAdd, carUpdate } from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';

class AdminCarCuScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalVin: '',
            name: '',
            vin: '',
            mileage: '',
            licensePlate: '',
            engineSize: '',
            disableButton: true
        }
    }

    componentDidMount() {
        let item = this.props.navigation.state.params
        this.setState({
            originalVin: `${item.vin}`,
            name: `${item.name}`,
            vin: `${item.vin}`,
            mileage: `${item.mileage}`,
            licensePlate: `${item.licensePlate}`,
            engineSize: `${item.engineSize}`,
            disableButton: true
        })
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
                engineSize: `${item.engineSize}`,
                disableButton: true
            })
        }
    }

    handleBack = () => {
        NavigationService.navigate('Admin')
    }

    handleNameChange = async name => {
        await this.setState({ name: name })
        this.checkDifferences()
    }

    handleVinChange = async vin => {
        await this.setState({ vin: vin })
        this.checkDifferences()
    }

    handleMileageChange = async mileage => {
        await this.setState({ mileage: mileage })
        this.checkDifferences()
    }

    handleLicensePlateChange = async licensePlate => {
        await this.setState({ licensePlate: licensePlate })
        this.checkDifferences()
    }

    handleEngineSizeChange = async engineSize => {
        await this.setState({ engineSize: engineSize })
        this.checkDifferences()
    }

    checkDifferences = () => {
        let item = this.props.navigation.state.params
        if (this.state.name == item.name
            && this.state.vin == item.vin
            && this.state.mileage == item.mileage
            && this.state.licensePlate == item.licensePlate
            && this.state.engineSize == item.engineSize
            || this.state.name == ''
            || this.state.vin == ''
            || this.state.mileage == ''
            || this.state.licensePlate == ''
            || this.state.engineSize == '')
            this.setState({ disableButton: true })
        else
            this.setState({ disableButton: false })
    }

    handleCreate = () => {
        this.props.carAdd(this.state)
        this.setState({ disableButton: true })
    }

    handleUpdate = () => {
        this.props.carUpdate(this.state)
        this.setState({ disableButton: true })
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
                            <Button title="DODAJ POJAZD" color='#2ecc71' onPress={this.handleCreate} disabled={this.state.disableButton} />
                        ) : (
                                <Button title="EDYTUJ POJAZD" color='#2ecc71' onPress={this.handleUpdate} disabled={this.state.disableButton} />
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

export default connect(null, mapDispatchToProps)(AdminCarCuScreen);