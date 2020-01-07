import React from 'react';
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { userAdd, userUpdate } from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';

class AdminUserCuScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            originalEmail: '',
            disableButton: true
        }
    }

    componentDidMount() {
        let item = this.props.navigation.state.params
        this.setState({
            firstName: `${item.firstName}`,
            lastName: `${item.lastName}`,
            email: `${item.email}`,
            password: ``,
            originalEmail: `${item.email}`,
            disableButton: true
        })
    }

    componentDidUpdate(prevProps) {
        let item = this.props.navigation.state.params
        if (item != prevProps.navigation.state.params) {
            this.setState({
                firstName: `${item.firstName}`,
                lastName: `${item.lastName}`,
                email: `${item.email}`,
                originalEmail: `${item.email}`,
                disableButton: true
            })
        }
    }

    handleBack = () => {
        NavigationService.navigate('Admin')
    }

    handleEmailChange = async email => {
        await this.setState({ email: email })
        this.checkDifferences()
    }

    handleFirstNameChange = async firstName => {
        await this.setState({ firstName: firstName })
        this.checkDifferences()
    }

    handleLastNameChange = async lastName => {
        await this.setState({ lastName: lastName })
        this.checkDifferences()
    }

    handlePasswordChange = async password => {
        await this.setState({ password: password })
        this.checkDifferences()
    }

    checkDifferences = () => {
        let item = this.props.navigation.state.params
        if (this.state.firstName == item.firstName
            && this.state.lastName == item.lastName
            && this.state.email == item.email
            || (this.state.password == '' && item.email == '')
            || this.state.firstName == ''
            || this.state.lastName == ''
            || this.state.email == '')
            this.setState({ disableButton: true })
        else
            this.setState({ disableButton: false })
    }

    handleUpdate = () => {
        this.props.userUpdate(this.state)
        this.setState({ disableButton: true })
    }

    handleCreate = () => {
        this.props.userAdd(this.state)
        this.setState({ disableButton: true })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        {this.props.navigation.state.params.email == '' ? (
                            <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Dodawanie Użytkownika</Text>
                        ) : (
                                <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Edytowanie Użytkownika</Text>
                            )}
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                        <Text style={{ color: '#000', marginTop: 15 }}>Email</Text>
                        <TextInput
                            value={this.state.email}
                            onChangeText={this.handleEmailChange}
                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: '#000', marginTop: 15 }}>Imię</Text>
                                <TextInput
                                    value={this.state.firstName}
                                    onChangeText={this.handleFirstNameChange}
                                    style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                                />
                            </View>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: '#000', marginTop: 15 }}>Nazwisko</Text>
                                <TextInput
                                    value={this.state.lastName}
                                    onChangeText={this.handleLastNameChange}
                                    style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                                />
                            </View>
                        </View>
                        {this.props.navigation.state.params.email == '' && (
                            <Text style={{ color: '#000', marginTop: 15 }}>Password</Text>

                        )}
                        {this.props.navigation.state.params.email == '' && (<TextInput
                            value={this.state.password}
                            onChangeText={this.handlePasswordChange}
                            style={{ color: '#000', borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                        />
                        )}
                        {this.props.navigation.state.params.email == '' ? (
                            <Button title="DODAJ UŻYTKOWNIKA" color='#2ecc71' onPress={this.handleCreate} disabled={this.state.disableButton} />
                        ) : (
                                <Button title="EDYTUJ UŻYTKOWNIKA" color='#2ecc71' onPress={this.handleUpdate} disabled={this.state.disableButton} />
                            )}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    userAdd: user => dispatch(userAdd(user)),
    userUpdate: user => dispatch(userUpdate(user))
})

export default connect(null, mapDispatchToProps)(AdminUserCuScreen);