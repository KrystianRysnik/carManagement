import React from 'react'
import { View, ScrollView, Text, TextInput, Picker, Button, TouchableOpacity, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { connect } from 'react-redux'
import { routeUpdate } from '../_actions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../NavigationService'
import moment from 'moment'

class AdminRouteCuScreen extends React.Component {
    constructor(props) {
        super(props)
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
        })
        this.checkDifferences()
    }

    handleStartTraceChange = async (event, date) => {
        startTrace = date || this.state.startTrace

        await this.setState({
            showDateStart: Platform.OS === 'ios' ? true : false,
            startTrace: startTrace,
        })
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
        await this.setState({ stopTrace: moment(this.state.stopTrace).add({ hours: parseInt(time[0]), minutes: parseInt(time[1]), seconds: parseInt(time[2]) }).toDate() })
        this.props.routeUpdate(this.state)
        this.setState({ disableButton: true })
    }

    render() {
        let carsList = this.props.cars.map((item, index) => {
            return (<Picker.Item label={`${item.licensePlate} - ${item.vin}`} key={item.vin} value={item.vin} />)
        })

        let usersList = this.props.users.map((item, index) => {
            return (<Picker.Item label={`${item.email} - ${item.firstName} ${item.lastName}`} key={item.email} value={item.email} />)
        })

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerTouchable} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={styles.headerTitle}>Edytowanie Trasy</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Text style={{ color: '#000' }}>Numer Vin</Text>
                        <Picker
                            selectedValue={this.state.carVin}
                            style={{ height: 37 }}
                            onValueChange={this.handleVinChange}>
                            {carsList}
                        </Picker>
                        <View style={styles.separator}></View>

                        <Text style={styles.inputLabel}>Kierowca</Text>
                        <Picker
                            selectedValue={this.state.driverEmail}
                            style={{ height: 37 }}
                            onValueChange={this.handleDriverEmailChange}>
                            {usersList}
                        </Picker>
                        <View style={styles.separator}></View>

                        <Text style={styles.inputLabel}>Data rozpoczęcia trasy</Text>
                        <TouchableOpacity onPress={() => this.setState({ showDateStart: true })}><Text style={{ padding: 8, fontSize: 16 }}>{moment(this.state.startTrace).format('DD.MM.YYYY')}</Text></TouchableOpacity>
                        <View style={styles.separator}></View>

                        <Text style={styles.inputLabel}>Cel wyjazdu</Text>
                        <TextInput
                            value={this.state.purpose}
                            onChangeText={this.handlePurposeChange}
                            style={styles.input}
                        />

                        <Text style={styles.inputLabel}>Czas trwania (hh:mm:ss)</Text>
                        <TextInput
                            value={this.state.duration}
                            onChangeText={this.handleDurationChange}
                            style={styles.input}
                        />

                        <Text style={styles.inputLabel}>Dystans (km)</Text>
                        <TextInput
                            value={this.state.distance}
                            onChangeText={this.handleDistanceChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.container}>
                        <Button title="EDYTUJ TRASE" color='#2ecc71' onPress={this.handleUpdate} disabled={this.state.disableButton} />
                    </View>
                </ScrollView>
                {this.state.showDateStart && <DateTimePicker value={this.state.startTrace}
                    mode={this.state.mode}
                    display="default"
                    onChange={this.handleStartTraceChange} />
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        cars: state.car.cars,
        users: state.user.users
    }
}

const mapDispatchToProps = dispatch => ({
    routeUpdate: route => dispatch(routeUpdate(route))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminRouteCuScreen)

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
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#e3e3e3'
    },
    input: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        color: '#000',
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1
    },
    inputLabel: {
        marginTop: 20,
        color: '#000'
    }
})