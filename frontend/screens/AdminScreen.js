import React from 'react'
import { View, ScrollView, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { userList } from '../_actions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../NavigationService'

class AdminScreen extends React.Component {
    handleBack = () => {
        NavigationService.goBack()
    }

    componentDidMount() {
        this.props.userList()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerTouchable} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={styles.headerTitle}>Panel Administratora</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>

                    <View style={styles.container} >
                        <Icon name='people' size={36} color='#000' />
                        <Text style={styles.itemTitle}>Użytkownicy</Text>
                    </View>

                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: '66.66%', paddingHorizontal: 5 }}>
                            <Button title="LISTA UŻYTKOWNIKÓW" onPress={() => NavigationService.navigate('AdminUser')} />
                        </View>
                        <View style={{ width: '33.33%', paddingHorizontal: 5 }}>
                            <Button title="DODAJ" color='#2ecc71' onPress={() => NavigationService.navigate('AddEditUser', { email: '', firstName: '', lastName: '' })} />
                        </View>
                    </View>

                    <View style={styles.container} >
                        <Icon name='directions-car' size={36} color='#000' />
                        <Text style={styles.itemTitle}>Pojazdy</Text>
                    </View>

                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: '66.66%', paddingHorizontal: 5 }}>
                            <Button title="LISTA POJAZDÓW" onPress={() => NavigationService.navigate('AdminCar')} />
                        </View>
                        <View style={{ width: '33.33%', paddingHorizontal: 5 }}>
                            <Button title="DODAJ" color='#2ecc71' onPress={() => NavigationService.navigate('AddEditCar', { name: '', mileage: '', engineSize: '', vin: '', licensePlate: '' })} />
                        </View>
                    </View>

                    <View style={styles.container} >
                        <Icon name='history' size={36} color='#000' />
                        <Text style={styles.itemTitle}>Trasy</Text>
                    </View>

                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ width: '66.66%', paddingHorizontal: 5 }}>
                            <Button title="LISTA OSTATNICH TRAS" onPress={() => NavigationService.navigate('AdminRoute')} />
                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userList: () => dispatch(userList())
})

export default connect(null, mapDispatchToProps)(AdminScreen)

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
    itemTitle: {
        paddingLeft: 15,
        fontWeight: 'bold',
        fontSize: 18,

    }
})