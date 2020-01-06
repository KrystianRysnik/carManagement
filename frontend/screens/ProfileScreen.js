import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../_store/store';
import { connect } from 'react-redux';
import { userSignOut, userUpdate } from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';

class ProfileScreen extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
    }

    componentDidMount() {
        this.setState({
            firstName: this.props.profile.firstName,
            lastName: this.props.profile.lastName,
            email: this.props.profile.email
        })
    }

    handleLogout = async () => {
        const token = await AsyncStorage.getItem('@token')
        this.props.userSignOut(token)
    }

    handleUpdate = () => {
        this.props.userUpdate(this.state)
    }

    handleBack = () => {
        NavigationService.goBack()
    }

    handleFirstNameChange = firstName => {
        this.setState({ firstName: firstName })
    }

    handleLastNameChange = lastName => {
        this.setState({ lastName: lastName })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Profil</Text>
                    </TouchableOpacity>
                    <Text style={{ paddingHorizontal: 10, lineHeight: 45, fontSize: 10, color: '#8f8f8f', textTransform: 'uppercase' }} onPress={this.handleLogout}>Wyloguj się</Text>
                </View>

                <View style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                    <Text>{this.state.email}</Text>
                    </View>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                        value={this.state.firstName}
                        onChangeText={this.handleFirstNameChange}
                        style={{ width: '45%', borderBottomWidth: 1, borderBottomColor: '#000' }} />
                        <TextInput
                        value={this.state.lastName}
                        onChangeText={this.handleLastNameChange}
                        style={{ width: '45%', borderBottomWidth: 1, borderBottomColor: '#000' }} />
                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                        <Button title='Aktualizuj Profil' onPress={this.handleUpdate}/>
                    </View>
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
    userSignOut: token => dispatch(userSignOut(token)),
    userUpdate: user => dispatch(userUpdate(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);