import React from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../NavigationService'
import axios from 'axios'
import moment from 'moment'

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

    render() {
        const { routes } = this.state

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerTouchable} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={styles.headerTitle}>Historia Tras</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList data={routes}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <TouchableOpacity style={{ padding: 15 }} onPress={() => NavigationService.navigate('RouteMap', { item })}>
                                    <Text>Data: <Text style={{ fontWeight: 'bold' }}>{moment(item.startTrace).format('DD MMM YYYY, HH:mm')}</Text></Text>
                                    <Text>Kierowca: {item.driver.firstName} {item.driver.lastName}</Text>
                                    <Text>Samochód: {item.carVin} </Text>
                                    <Text>Dystans: {item.distance.toFixed(2)} km</Text>
                                    <Text>Czas trwania: {moment(moment(item.stopTrace).diff(moment(item.startTrace))).format('HH:mm:ss')}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item => item._id)}
                    />
                </View>
            </View>
        )
    }
}

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
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    }
})