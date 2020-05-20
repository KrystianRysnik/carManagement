import React from 'react'
import { View, Text, Button, Image, ImageBackground, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { userSignIn } from '../_actions'
import NavigationService from '../NavigationService'
import Input from '../_components/Input'

class SignInScreen extends React.Component {
    state = {
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
        this.props.userSignIn(this.state)
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
                                name='Email'
                                value={this.state.email}
                                onChangeFn={value => this.handleChange('email', value)}
                            />
                            <Input
                                primary
                                name='Hasło'
                                value={this.state.password}
                                onChangeText={value => this.handleChange('password', value)}
                                secureTextEntry
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
    hint: {
        marginTop: 15,
        color: '#fff',
        textAlign: 'center'
    }
})