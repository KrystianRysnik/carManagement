import React from 'react'
import { Alert, View, Text, TouchableOpacity, FlatList, StyleSheet, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { carDelete } from '../_actions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../NavigationService'
import LicensePlate from '../_components/LicensePlate'

class AdminCarScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    handleDelete = car => {
        Alert.alert(
            `Usuwanie Pojazdu`,
            `Czy napewno chcesz usunąć pojazd ${car.name} o numerze rejestracyjnym ${car.licensePlate}?`,
            [
                {
                    text: 'Anuluj',
                    style: 'cancel',
                },
                {
                    text: 'Usuń',
                    onPress: async () => {
                        await this.props.carDelete(car._id)
                        setTimeout(() => {
                            if (this.props.error.delete == false) {
                                ToastAndroid.showWithGravityAndOffset(
                                    'Pomyśline usunięto pojazd',
                                    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
                                );
                            }
                        }, 250)
                    }
                },
            ],
            { cancelable: false },
        )

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerTouchable} onPress={() => NavigationService.navigate('Admin')}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={styles.headerTitle}>Zarządzanie Pojazdami</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList data={this.props.cars}
                        renderItem={({ item }) => (
                            <View style={styles.itemList}>
                                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                <LicensePlate value={item.licensePlate} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Pojemność silnika: {item.engineSize} cm</Text>
                                    <Text style={{ fontSize: 10, lineHeight: 14 }}>3</Text>
                                </View>
                                <Text>Przebieg: {item.mileage} km</Text>
                                <Text>Numer VIN: {item.vin}</Text>
                                <View style={styles.buttons}>
                                    <View style={styles.editBtn}>
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => NavigationService.navigate('AddEditCar', item)}>
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
                        keyExtractor={(item => item.vin)}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.car.error,
        cars: state.car.cars,
        licensePlate: state.car.car.licensePlate
    }
}

const mapDispatchToProps = dispatch => ({
    carDelete: car => dispatch(carDelete(car))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminCarScreen)

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