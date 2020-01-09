import React from 'react'
import { View, Text, Alert, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { routeDelete } from '../_actions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../NavigationService'
import axios from 'axios'
import moment from 'moment'

class AdminRouteScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            car: '',
            routes: [],
        }
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

    handleDelete = route => {
        Alert.alert(
            `Usuwanie Trasy`,
            `Czy napewno chcesz usunąć trasę z dnia ${route.startTrace}?`,
            [
                {
                    text: 'Anuluj',
                    style: 'cancel',
                },
                {
                    text: 'Usuń',
                    onPress: () => this.props.routeDelete(route._id)
                },
            ],
            { cancelable: false },
        )
    }

    render() {
        const { routes } = this.state

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerTouchable} onPress={() => NavigationService.navigate('Admin')}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={styles.headerTitle}>Historia Tras</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList data={routes}
                        renderItem={({ item }) => (
                            <View style={styles.itemList}>
                                <Text>Data: <Text style={{ fontWeight: 'bold' }}>{moment(item.startTrace).format('DD MMM YYYY, HH:mm')}</Text></Text>
                                <Text>Kierowca: {item.driver.firstName} {item.driver.lastName}</Text>
                                <Text>Samochód: {item.carVin} </Text>
                                <Text>Dystans: {item.distance.toFixed(2)} km</Text>
                                <Text>Czas trwania: {moment(moment(item.stopTrace).diff(moment(item.startTrace))).format('HH:mm:ss')}</Text>

                                <View style={styles.buttons}>
                                    <View style={styles.editBtn}>
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => NavigationService.navigate('EditRoute', item)}>
                                            <Icon name='edit' size={28} color='#fff' />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.removeBtn}>
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => this.handleDelete(item)}>
                                            <Icon name='delete-forever' size={28} color='#fff' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item => item._id)}
                    />
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    routeDelete: id => dispatch(routeDelete(id))
})

export default connect(null, mapDispatchToProps)(AdminRouteScreen)

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
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemList: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    },
    buttons: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 20,
        top: 10
    },
    editBtn: {
        width: 32,
        height: 32,
        backgroundColor: '#f39c12',
        borderWidth: 1,
        borderColor: '#e67e22',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    removeBtn: {
        marginLeft: 15,
        width: 32,
        height: 32,
        backgroundColor: '#e74c3c',
        borderWidth: 1,
        borderColor: '#c0392b',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
})