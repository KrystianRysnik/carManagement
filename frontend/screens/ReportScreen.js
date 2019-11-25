import React from 'react';
import { View, Text, TouchableOpacity, Button, Picker } from 'react-native';
import store from '../_store/store';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import axios from 'axios';
import { carsList } from '../_actions';

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
        car: ''
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
                return (<Picker.Item label={item.name} key={item.vin} value={item.vin} />)
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
                    <Text>Generate report for car:</Text>
                    <Picker
                        selectedValue={this.state.car}
                        style={{ height: 50 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ car: itemValue })
                        }>
                        {carsList}
                    </Picker>
                    <Text>from:</Text>
                    <TouchableOpacity onPress={() => this.setState({ showDateStart: true })}><Text>{moment(dateStart).format('Do MMM YYYY')}</Text></TouchableOpacity>
                    <Text>to:</Text>
                    <TouchableOpacity onPress={() => this.setState({ showDateEnd: true })}><Text>{moment(dateEnd).format('Do MMM YYYY')}</Text></TouchableOpacity>
                    <Button title='Generate & Download PDF' onPress={this.handleSubmit}/>
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