import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { userSignUp } from '../_actions';
import NavigationService from '../NavigationService';

class SignUpScreen extends React.Component {
    state = {
        name: "",
        email: "",
        password: ""
    }

    handleNameChange = name => {
        this.setState({ name: name })
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
                <Text>Sign Up For An Account</Text>

                <Text>Username</Text>
                <TextInput
                    value={this.state.name}
                    placeholder='Username'
                    onChangeText={this.handleNameChange}
                />

                <Text>email</Text>
                <TextInput
                    value={this.state.email}
                    placeholder='Email'
                    onChangeText={this.handleEmailChange}
                />

                <Text>Password</Text>
                <TextInput
                    secureTextEntry
                    value={this.state.password}
                    placeholder='Password'
                    onChangeText={this.handlePasswordChange}
                />

                <Button title='Sign Up' onPress={this.handleSubmit}/>
                <Text>Have an account? <Text onPress={() => NavigationService.navigate('SignIn', null)}>Sign In</Text></Text>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userSignUp: userInfo => dispatch(userSignUp(userInfo))
})

export default connect(null, mapDispatchToProps)(SignUpScreen);