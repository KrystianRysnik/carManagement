import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';
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
                <Text>Login</Text>

                <Text>Username</Text>
                <TextInput
                    placeholder='Email'
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                />

                <Text>Password</Text>
                <TextInput
                    secureTextEntry
                    value={this.state.password}
                    placeholder='Password'
                    onChangeText={this.handlePasswordChange}
                />

                <Button title="Sign In" onPress={this.handleSubmit} />
                <Text>Don't have an account? <Text onPress={() => NavigationService.navigate('SignUp', null)}>Create account</Text></Text>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userSignIn: userInfo => dispatch(userSignIn(userInfo))
})

export default connect(null, mapDispatchToProps)(SignInScreen);