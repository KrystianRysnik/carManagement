import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../_store/store';
import { connect } from 'react-redux';
import { userSignOut, userProfileUpdate } from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';

class ProfileScreen extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        disableButton: true
    }

    componentDidMount() {
        this.setState({
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email
        })
    }

    handleLogout = async () => {
        const token = await AsyncStorage.getItem('@token')
        this.props.userSignOut(token)
    }

    handleUpdate = () => {
        this.props.userProfileUpdate(this.state)
        this.setState({ disableButton: true })
    }

    handleBack = () => {
        NavigationService.goBack()
    }

    checkDifferences = () => {
        if (this.state.firstName == this.props.user.firstName
            && this.state.lastName == this.props.user.lastName
            || this.state.firstName == ''
            || this.state.lastName == '')
            this.setState({ disableButton: true })
        else
            this.setState({ disableButton: false })
    }

    handleFirstNameChange = async firstName => {
        await this.setState({ firstName: firstName })
        this.checkDifferences()

    }

    handleLastNameChange = async lastName => {
        await this.setState({ lastName: lastName })
        this.checkDifferences()
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
                        <Text style={{ color: '#000', marginTop: 15 }}>Email</Text>
                        <TextInput
                            value={this.state.email}
                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 0, paddingVertical: 5 }}
                            editable={false}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '45%' }}>
                            <Text style={{ color: '#000', marginTop: 15 }}>Imię</Text>
                            <TextInput
                                value={this.state.firstName}
                                onChangeText={this.handleFirstNameChange}
                                style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 1, paddingVertical: 5 }}
                            />
                        </View>
                        <View style={{ width: '45%' }}>
                            <Text style={{ color: '#000', marginTop: 15 }}>Nazwisko</Text>
                            <TextInput
                                value={this.state.lastName}
                                onChangeText={this.handleLastNameChange}
                                style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 1, paddingVertical: 5 }}
                            />
                        </View>

                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                        <Button title='Aktualizuj Profil' onPress={this.handleUpdate} disabled={this.state.disableButton} />
                    </View>
                </View>
            </View>
        );
    }
}



const mapStateToProps = state => {
    return {
        user: state.user.user,
    };
}

const mapDispatchToProps = dispatch => ({
    userSignOut: token => dispatch(userSignOut(token)),
    userProfileUpdate: user => dispatch(userProfileUpdate(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);