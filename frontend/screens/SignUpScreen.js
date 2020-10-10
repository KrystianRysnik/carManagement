import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ToastAndroid,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {userSignUp} from '../_actions';
import NavigationService from '../NavigationService';
import Input from '../_components/Input';
import backgorundImage from '../_assets/background.png';
import logoWhite from '../_assets/logo_white.png';

class SignUpScreen extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  handleChange = (name, value) => {
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleSubmit = async () => {
    await this.props.userSignUp(this.state);
    if (this.props.signUpError) {
      ToastAndroid.showWithGravityAndOffset(
        'Wystąpił błąd podczas rejestracji',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    }
  };

  render() {
    const {firstName, lastName, email, password} = this.state;
    return (
      <View>
        <ImageBackground
          source={backgorundImage}
          style={{width: '100%', height: '100%'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={logoWhite} style={styles.logo} />

            <View style={{width: '80%'}}>
              <Input
                primary
                name="Imię"
                value={firstName}
                onChangeFn={(value) => this.handleChange('firstName', value)}
              />
              <Input
                primary
                name="Nazwisko"
                value={lastName}
                onChangeFn={(value) => this.handleChange('lastName', value)}
              />
              <Input
                primary
                name="Email"
                value={email}
                onChangeFn={(value) => this.handleChange('email', value)}
              />
              <Input
                primary
                name="Hasło"
                value={password}
                onChangeFn={(value) => this.handleChange('password', value)}
                secureTextEntry
              />
              <Button title="Zarejestruj Się" onPress={this.handleSubmit} />
              <Text style={styles.hint}>
                Posiadasz Konto?{' '}
                <Text
                  style={{fontWeight: 'bold'}}
                  onPress={() => NavigationService.navigate('SignIn', null)}>
                  Zaloguj Się
                </Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signUpError: state.user.error.signUp,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userSignUp: (userInfo) => dispatch(userSignUp(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

SignUpScreen.propTypes = {
  userSignUp: PropTypes.func.isRequired,
  signUpError: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 180,
  },
  hint: {
    marginTop: 15,
    color: '#fff',
    textAlign: 'center',
  },
});
