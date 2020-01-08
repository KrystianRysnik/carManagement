import React from 'react';
import { View, ScrollView, Text, TextInput, Picker, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { routeUpdate } from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';
import moment from 'moment';

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
            mode: 'date'
        }
    }

    componentDidMount() {
        let item = this.props.navigation.state.params
        this.setState({
            _id: item._id,
            carVin: item.carVin,
            startTrace: moment(item.startTrace).toDate(),
            stopTrace: moment(item.stopTrace).toDate(),
            duration: moment(moment(item.stopTrace).diff(moment(item.startTrace))).format('HH:mm:ss').toString(),
            distance: item.distance.toString(),
            purpose: item.purpose,
            driverEmail: item.driver.email,
            driverFirstName: item.driver.firstName,
            driverLastName: item.driver.lastName,
            disableButton: true
        })

    }

    componentDidUpdate(prevProps) {
        let item = this.props.navigation.state.params
        if (item != prevProps.navigation.state.params) {
            this.setState({
                _id: item._id,
                carVin: item.carVin,
                startTrace: moment(item.startTrace).toDate(),
                stopTrace: moment(item.stopTrace).toDate(),
                duration: moment(moment(item.stopTrace).diff(moment(item.startTrace))).format('HH:mm:ss').toString(),
                distance: item.distance.toString(),
                purpose: item.purpose,
                driverEmail: item.driver.email,
                driverFirstName: item.driver.firstName,
                driverLastName: item.driver.lastName,
                disableButton: true
            })
        }
    }

    handleBack = () => {
        NavigationService.navigate('Admin')
    }

    handleVinChange = async (itemValue, itemIndex) => {
        await this.setState({ carVin: itemValue })
        this.checkDifferences()
    }

    handleDriverEmailChange = async (itemValue, itemIndex) => {
        await this.setState({ driverEmail: itemValue })
        await this.props.users.forEach(element => {
            if (element.email == this.state.driverEmail) {
                this.setState({
                    driverFirstName: element.firstName,
                    driverLastName: element.lastName
                })
            }
        });
        this.checkDifferences()
    }

    handleStartTraceChange = async (event, date) => {
        startTrace = date || this.state.startTrace;

        await this.setState({
            showDateStart: Platform.OS === 'ios' ? true : false,
            startTrace: startTrace,
        });
        this.checkDifferences()
    }

    handleDurationChange = async duration => {
        await this.setState({ duration: duration })
        this.checkDifferences()
    }

    handleDistanceChange = async distance => {
        await this.setState({ distance: distance })
        this.checkDifferences()
    }

    handlePurposeChange = async purpose => {
        await this.setState({ purpose: purpose })
        this.checkDifferences()
    }

    checkDifferences = () => {
        let item = this.props.navigation.state.params
        if (this.state.driverEmail == item.driver.email
            && this.state.carVin == item.carVin
            && this.state.distance == item.distance
            && this.state.purpose == item.purpose
            && moment(this.state.startTrace).format('DD/MM/YYYY').toString() == moment(item.startTrace).format('DD/MM/YYYY').toString()
            || this.state.duration == ''
            || this.state.purpose == ''
            || this.state.distance == '')
            this.setState({ disableButton: true })
        else
            this.setState({ disableButton: false })
    }

    handleUpdate = async () => {
        let time = this.state.duration.split(':')
        await this.setState({ stopTrace: this.state.startTrace })
        await this.setState({ stopTrace: moment(this.state.stopTrace).add({hours:parseInt(time[0]), minutes:parseInt(time[1]), seconds:parseInt(time[2])}).toDate() })
        this.props.routeUpdate(this.state)
        this.setState({ disableButton: true })
    }

    render() {
        let carsList = this.props.cars.map((item, index) => {
            return (<Picker.Item label={`${item.licensePlate} - ${item.vin}`} key={item.vin} value={item.vin} />)
        });

        let usersList = this.props.users.map((item, index) => {
            return (<Picker.Item label={`${item.email} - ${item.firstName} ${item.lastName}`} key={item.email} value={item.email} />)
        });

        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Edytowanie Trasy</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                        <Text style={{ color: '#000', marginTop: 7 }}>Numer Vin</Text>
                        <Picker
                            selectedValue={this.state.carVin}
                            style={{ height: 37 }}
                            onValueChange={this.handleVinChange}>
                            {carsList}
                        </Picker>
                        <View style={{ marginVertical: 8, width: '100%', height: 1, backgroundColor: '#b6b6b6' }}></View>
                        <Text style={{ color: '#000', marginTop: 7 }}>Kierowca</Text>
                        <Picker
                            selectedValue={this.state.driverEmail}
                            style={{ height: 37 }}
                            onValueChange={this.handleDriverEmailChange}>
                            {usersList}
                        </Picker>
                        <View style={{ marginVertical: 8, width: '100%', height: 1, backgroundColor: '#b6b6b6' }}></View>
                        <Text style={{ color: '#000', marginTop: 7 }}>Data rozpoczęcia trasy</Text>
                        <TouchableOpacity onPress={() => this.setState({ showDateStart: true })}><Text style={{ padding: 8, fontSize: 16 }}>{moment(this.state.startTrace).format('DD.MM.YYYY')}</Text></TouchableOpacity>
                        <View style={{ marginVertical: 8, width: '100%', height: 1, backgroundColor: '#b6b6b6' }}></View>

                        <Text style={{ color: '#000', marginTop: 7 }}>Cel wyjazdu</Text>
                        <TextInput
                            value={this.state.purpose}
                            onChangeText={this.handlePurposeChange}
                            style={{ color: '#000', borderBottomColor: '#e3e3e3', borderBottomWidth: 1, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <Text style={{ color: '#000', marginTop: 7 }}>Czas trwania (hh:mm:ss)</Text>
                        <TextInput
                            value={this.state.duration}
                            onChangeText={this.handleDurationChange}
                            style={{ color: '#000', borderBottomColor: '#e3e3e3', borderBottomWidth: 1, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <Text style={{ color: '#000', marginTop: 7 }}>Dystans (km)</Text>
                        <TextInput
                            value={this.state.distance}
                            onChangeText={this.handleDistanceChange}
                            style={{ color: '#000', borderBottomColor: '#e3e3e3', borderBottomWidth: 1, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <Button title="EDYTUJ TRASĘ" color='#2ecc71' onPress={this.handleUpdate} disabled={this.state.disableButton} />
                    </View>
                </ScrollView>
                {this.state.showDateStart && <DateTimePicker value={this.state.startTrace}
                    mode={this.state.mode}
                    display="default"
                    onChange={this.handleStartTraceChange} />
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        cars: state.car.cars,
        users: state.user.listUser
    };
}

const mapDispatchToProps = dispatch => ({
    routeUpdate: route => dispatch(routeUpdate(route)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminRouteCuScreen);