import React from 'react'
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { carAdd, carUpdate } from '../_actions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../NavigationService'

class AdminCarCuScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
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
            _id: `${item._id}`,
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
                _id: `${item._id}`,
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

    handleCreate = async () => {
        await this.props.carAdd(this.state)
        setTimeout(() => {
            if (this.props.error.add == true) {
                ToastAndroid.showWithGravityAndOffset(
                    'Wystąpił błąd podczas dodawania pojazdu',
                    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
                );
            }
            else {
                ToastAndroid.showWithGravityAndOffset(
                    'Pomyślnie dodano pojazd',
                    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
                );
                this.setState({ disableButton: true })
            }
        }, 250)
    }

    handleUpdate = async () => {
        await this.props.carUpdate(this.state)
        setTimeout(() => {
            if (this.props.error.update == true) {
                ToastAndroid.showWithGravityAndOffset(
                    'Wystąpił błąd podczas aktualizacji pojazdu',
                    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
                );
            }
            else {
                ToastAndroid.showWithGravityAndOffset(
                    'Pomyślnie zaktualizowano pojazd',
                    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
                );
                this.setState({ disableButton: true })
            }
        }, 250)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerTouchable} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        {this.props.navigation.state.params.vin == '' ? (
                            <Text style={styles.headerTitle}>Dodawanie Pojazdu</Text>
                        ) : (
                                <Text style={styles.headerTitle}>Edytowanie Pojazdu</Text>
                            )}
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Text style={{ color: '#000' }}>Nazwa samochodu</Text>
                        <TextInput
                            value={this.state.name}
                            onChangeText={this.handleNameChange}
                            style={styles.input}
                        />
                        <Text style={styles.inputLabel}>Numer VIN</Text>
                        <TextInput
                            value={this.state.vin}
                            onChangeText={this.handleVinChange}
                            style={styles.input}
                        />
                        <Text style={styles.inputLabel}>Tablica rejestracyjna</Text>
                        <TextInput
                            value={this.state.licensePlate}
                            onChangeText={this.handleLicensePlateChange}
                            style={styles.input}
                        />
                        <Text style={styles.inputLabel}>Przebieg</Text>
                        <TextInput
                            value={this.state.mileage}
                            onChangeText={this.handleMileageChange}
                            style={styles.input}
                        />
                        <Text style={styles.inputLabel}>Pojemność silnika</Text>
                        <TextInput
                            value={this.state.engineSize}
                            onChangeText={this.handleEngineSizeChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.container}>
                        {this.props.navigation.state.params.vin == '' ? (
                            <Button title="DODAJ POJAZD" color='#2ecc71' onPress={this.handleCreate} disabled={this.state.disableButton} />
                        ) : (
                                <Button title="EDYTUJ POJAZD" color='#2ecc71' onPress={this.handleUpdate} disabled={this.state.disableButton} />
                            )}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.car.error,
    }
}

const mapDispatchToProps = dispatch => ({
    carAdd: car => dispatch(carAdd(car)),
    carUpdate: car => dispatch(carUpdate(car))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminCarCuScreen)

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTouchable: {
        paddingHorizontal: 10,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        marginLeft: 15,
        fontWeight: 'bold'
    },
    container: {
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    input: {
        paddingVertical: 5,
        color: '#000',
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1
    },
    inputLabel: {
        marginTop: 20,
        color: '#000'
    }
})