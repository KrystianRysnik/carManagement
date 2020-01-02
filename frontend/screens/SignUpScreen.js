import React from 'react';
import { View, TextInput, Text, Button, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { userSignUp } from '../_actions';
import NavigationService from '../NavigationService';

class SignUpScreen extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    handleFirstNameChange = firstName => {
        this.setState({ firstName: firstName })
    }

    handleLastNameChange = lastName => {
        this.setState({ lastName: lastName })
    }

    handleEmailChange = email => {
        this.setState({ email: email })
    }

    handlePasswordChange = password => {
        this.setState({ password: password })
    }

    handleSubmit = () => {
        this.props.userSignUp(this.state)
    }

    render() {
        return (
            <View>
                <ImageBackground source={require('../_assets/background.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../_assets/logo_white.png')} style={{ width: 180, height: 180 }} />

                        <View style={{ width: '80%' }}>

                            <Text style={{ color: '#ffffff', marginTop: 15, fontSize: 12 }}>Imię</Text>
                            <TextInput
                                value={this.state.firstName}
                                onChangeText={this.handleFirstNameChange}
                                style={{ color: '#ffffff', borderBottomColor: '#ffffff', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                            />

<Text style={{ color: '#ffffff', marginTop: 15, fontSize: 12 }}>Nazwisko</Text>
                            <TextInput
                                value={this.state.lastName}
                                onChangeText={this.handleLastNameChange}
                                style={{ color: '#ffffff', borderBottomColor: '#ffffff', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                            />

                            <Text style={{ color: '#ffffff', marginTop: 15, fontSize: 12 }}>Email</Text>
                            <TextInput
                                value={this.state.email}
                                onChangeText={this.handleEmailChange}
                                style={{ color: '#ffffff', borderBottomColor: '#ffffff', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                            />

                            <Text style={{ color: '#ffffff', marginTop: 15, fontSize: 12 }}>Hasło</Text>
                            <TextInput
                                secureTextEntry
                                value={this.state.password}
                                onChangeText={this.handlePasswordChange}
                                style={{ color: '#ffffff', borderBottomColor: '#ffffff', borderBottomWidth: 2, marginBottom: 15, paddingVertical: 5 }}
                            />

                            <Button style={{ marginVertical: 15 }} title='Zarejestruj Się' onPress={this.handleSubmit} />
                            <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 15 }}>Posiadasz Konto? <Text style={{ fontWeight: 'bold' }} onPress={() => NavigationService.navigate('SignIn', null)}>Zaloguj Się</Text></Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userSignUp: userInfo => dispatch(userSignUp(userInfo))
})

export default connect(null, mapDispatchToProps)(SignUpScreen);