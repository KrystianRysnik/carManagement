import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Picker } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';
import axios from 'axios';
import moment from 'moment';

export default class RouteScreen extends React.Component {
    state = {
        car: '',
        routes: [],
    }

    routesList = () => {
        axios.get('https://car-management-backend.herokuapp.com/route/list')
            .then(res => {
                console.log('🟢 List Routes Succesfull!')
                this.setState({ routes: res.data })
            })
            .catch(error => {
                console.log('🔴 List Cars Error!')
                console.log(error)
            })
    }

    componentDidMount() {
        this.routesList()
    }

    handleBack = () => {
        NavigationService.goBack()
    }

    handleSelect = car => {
        // this.props.carSelect(car)
    }

    render() {
        const { routes } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Routes history</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList data={routes} style={{ flex: 1 }}
                        renderItem={({ item }) => (
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3' }}>
                                <TouchableOpacity style={{ padding: 15 }} onPress={() => NavigationService.navigate('RouteMap', {item})}>
                                    <Text>Date: <Text style={{ fontWeight: 'bold' }}>{moment(item.startTrace).format('DD MMM YYYY, HH:mm')}</Text></Text>
                                    <Text>User: {item.userEmail}</Text>
                                    <Text>Car: {item.carVin} </Text>
                                    <Text>Distance: {item.distance.toFixed(2)}km</Text>
                                    <Text>Duration: { moment(moment(item.stopTrace).diff(moment(item.startTrace))).format('HH:mm:ss') }</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item => item._id)}
                    />
                </View>
            </View>
        );
    }
}
