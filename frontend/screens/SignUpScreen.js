import React from 'react'
import { View, Text, Button, Image, ImageBackground, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { userSignUp } from '../_actions'
import NavigationService from '../NavigationService'
import Input from '../_components/Input'

class SignUpScreen extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    handleChange = (name, value) => {
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    handleSubmit = () => {
        this.props.userSignUp(this.state)
    }

    render() {
        return (
            <View>
                <ImageBackground source={require('../_assets/background.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../_assets/logo_white.png')} style={styles.logo} />

                        <View style={{ width: '80%' }}>
                            <Input
                                primary
                                name='Imię'
                                value={this.state.firstName}
                                onChangeFn={value => this.handleChange('firstName', value)}
                            />
                            <Input
                                primary
                                name='Nazwisko'
                                value={this.state.lastName}
                                onChangeFn={value => this.handleChange('lastName', value)}
                            />
                            <Input
                                primary
                                name='Email'
                                value={this.state.email}
                                onChangeFn={value => this.handleChange('email', value)}
                            />
                            <Input
                                primary
                                name='Hasło'
                                value={this.state.password}
                                onChangeFn={value => this.handleChange('password', value)}
                                secureTextEntry
                            />
                            <Button title='Zarejestruj Się' onPress={this.handleSubmit} />
                            <Text style={styles.hint}>Posiadasz Konto? <Text style={{ fontWeight: 'bold' }} onPress={() => NavigationService.navigate('SignIn', null)}>Zaloguj Się</Text></Text>
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

export default connect(null, mapDispatchToProps)(SignUpScreen)

const styles = StyleSheet.create({
    logo: {
        width: 180,
        height: 180
    },
    hint: {
        marginTop: 15,
        color: '#fff',
        textAlign: 'center'
    }
})