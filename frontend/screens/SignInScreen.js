import React from 'react'
import { View, TextInput, Text, Button, Image, ImageBackground, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { userSignIn } from '../_actions'
import NavigationService from '../NavigationService'

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
                        <Image source={require('../_assets/logo_white.png')} style={styles.logo} />

                        <View style={{ width: '80%' }}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                value={this.state.email}
                                onChangeText={this.handleEmailChange}
                                style={styles.input}
                            />

                            <Text style={styles.inputLabel}>Hasło</Text>
                            <TextInput
                                secureTextEntry
                                value={this.state.password}
                                onChangeText={this.handlePasswordChange}
                                style={styles.input}
                            />

                            <Button title="Zaloguj Się" onPress={this.handleSubmit} />
                            <Text style={styles.hint} onPress={() => NavigationService.navigate('SignUp', null)}>Nie Posiadasz Konta? <Text style={{ fontWeight: 'bold' }}>Zarejestruj Się</Text></Text>
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

export default connect(null, mapDispatchToProps)(SignInScreen)

const styles = StyleSheet.create({
    logo: {
        width: 180,
        height: 180
    },
    inputLabel: {
        marginTop: 15,
        fontSize: 12,
        color: '#fff'
    },
    input: {
        marginBottom: 15,
        paddingVertical: 5,
        color: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
    },
    hint: {
        marginTop: 15,
        color: '#fff',
        textAlign: 'center'
    }
})