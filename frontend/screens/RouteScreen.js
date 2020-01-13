import React from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { routeList } from '../_actions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../NavigationService'
import moment from 'moment'

class RouteScreen extends React.Component {

    componentDidMount() {
        this.props.routeList()
    }

    handleBack = () => {
        NavigationService.goBack()
    }

    render() {
        const { routes } = this.props

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
                                <TouchableOpacity style={{ padding: 15 }} onPress={() => NavigationService.navigate('RouteMap', item)}>
                                    <Text>Data: <Text style={{ fontWeight: 'bold' }}>{moment(item.startTrace).format('DD/MMM/YYYY')}</Text></Text>
                                    <Text>Kierowca: {item.driver.firstName} {item.driver.lastName}</Text>
                                    <Text>Samochód: {item.carVin} </Text>
                                    <Text>Dystans: {item.distance.toFixed(2)} km</Text>
                                    <Text>Czas trwania: {moment(moment(item.stopTrace).diff(moment(item.startTrace))).utc().format('HH:mm:ss')}</Text>
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

const mapStateToProps = state => {
    return {
        routes: state.route.routes
    }
}

const mapDispatchToProps = dispatch => ({
    routeList: () => dispatch(routeList())
})

export default connect(mapStateToProps, mapDispatchToProps)(RouteScreen)

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