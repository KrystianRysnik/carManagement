import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../_store/store';
import { connect } from 'react-redux';
import { userSignOut } from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';

class ProfileScreen extends React.Component {
    handleLogout = async () => {
        const token = await AsyncStorage.getItem('@token')
        this.props.userSignOut(token)
    }

    handleBack = () => {
        NavigationService.goBack()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Profil</Text>
                    </TouchableOpacity>
                    <Text style={{ paddingHorizontal: 10, lineHeight: 45, fontSize: 10, color: '#8f8f8f', textTransform: 'uppercase' }}  onPress={this.handleLogout}>Wyloguj się</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Profile Screen</Text>
                    <Text>{this.props.profile.firstName} {this.props.profile.lastName}</Text>
                    <Text>{this.props.profile.email}</Text>
                </View>
            </View>
        );
    }
}



const mapStateToProps = state => {
    return {
        profile: state.user.currentUser,
    };
}

const mapDispatchToProps = dispatch => ({
    userSignOut: token => dispatch(userSignOut(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);