import React from 'react';
import { View, TextInput, Text, Button, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { userSignIn } from '../_actions';
import NavigationService from '../NavigationService';

class SignInScreen extends React.Component {
    state = {
        username: "",
        password: ""
    }

    handleEmailChange = email => {
        this.setState({ email: email })
    }

    handlePasswordChange = password => {
        this.setState({ password: password })
    }

    handleSubmit = () => {
        this.props.userSignIn(this.state)
    }

    render() {
        return (
            <View>
                <ImageBackground source={require('../_assets/background.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../_assets/logo_white.png')} style={{ width: 180, height: 180 }} />

                        <View style={{ width: '80%' }}>
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

                            <Button style={{ marginVertical: 15 }} title="Zaloguj Się" onPress={this.handleSubmit} />
                            <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 15 }} onPress={() => NavigationService.navigate('SignUp', null)}>Nie Posiadasz Konta? <Text style={{ fontWeight: 'bold' }}>Zarejestruj Się</Text></Text>
                        </View>
                    </View>
                </ImageBackground>

            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userSignIn: userInfo => dispatch(userSignIn(userInfo))
})

export default connect(null, mapDispatchToProps)(SignInScreen);