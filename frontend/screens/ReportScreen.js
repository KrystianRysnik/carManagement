import React from 'react';
import { View, Text, TouchableOpacity, Button, Picker } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import axios from 'axios';

class RouteScreen extends React.Component {
    static navigationOptions = {
        drawerIcon: (
            <Icon name='picture-as-pdf' size={24} color='#000' />
        )
    }

    state = {
        value: '',
        showDateStart: false,
        showDateEnd: false,
        dateStart: moment().subtract(1, 'months').toDate(),
        dateEnd: moment().toDate(),
        mode: 'date',
        show: false,
        car: 'all'
    }

    setDateStart = (event, date) => {
        dateStart = date || this.state.dateStart;

        this.setState({
            showDateStart: Platform.OS === 'ios' ? true : false,
            dateStart,
        });
    }

    setDateEnd = (event, date) => {
        dateEnd = date || this.state.dateEnd;

        this.setState({
            showDateEnd: Platform.OS === 'ios' ? true : false,
            dateEnd,
        });
    }

    handleBack = () => {
        NavigationService.goBack()
    }

    handleSubmit = () => {
        console.log('handle')
    }

    render() {
        const { dateStart, dateEnd, mode, showDateStart, showDateEnd } = this.state;

        let carsList =
            this.props.cars.map((item, index) => {
                return (<Picker.Item label={item.name + ' - LP: ' + item.licensePlate} key={item.vin} value={item.vin} />)
            });

        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Generate Report</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, padding: 20 }}>
                    <Text>Select Car:</Text>
                    <Picker
                        selectedValue={this.state.car}
                        style={{ height: 37 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ car: itemValue })
                        }>
                        <Picker.Item label='All Cars' key='all' value='all'/>
                        {carsList}
                    </Picker>
                    <View style={{ marginVertical: 8, width: '100%', height: 1, backgroundColor: '#b6b6b6'}}></View>
                    <Text>Select Start Date:</Text>
                    <TouchableOpacity onPress={() => this.setState({ showDateStart: true })}><Text style={{ padding: 8, fontSize: 16 }}>{moment(dateStart).format('Do MMM YYYY')}</Text></TouchableOpacity>
                    <View style={{ marginVertical: 8, width: '100%', height: 1, backgroundColor: '#b6b6b6'}}></View>
                    <Text>Select End Date:</Text>
                    <TouchableOpacity onPress={() => this.setState({ showDateEnd: true })}><Text style={{ padding: 8, marginBottom: 6, fontSize: 16 }}>{moment(dateEnd).format('Do MMM YYYY')}</Text></TouchableOpacity>
                    <Button title='Generate & Download PDF' onPress={this.handleSubmit} />
                </View>
                {showDateStart && <DateTimePicker value={dateStart}
                    mode={mode}
                    display="default"
                    onChange={this.setDateStart} />
                }
                {showDateEnd && <DateTimePicker value={dateEnd}
                    mode={mode}
                    display="default"
                    onChange={this.setDateEnd} />
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        cars: state.car.cars
    };
}

export default connect(mapStateToProps)(RouteScreen);