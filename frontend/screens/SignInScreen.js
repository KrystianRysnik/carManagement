import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ImageBackground,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {userSignIn} from '../_actions';
import NavigationService from '../NavigationService';
import Input from '../_components/Input';
import backgorundImage from '../_assets/background.png';
import logoWhite from '../_assets/logo_white.png';

class SignInScreen extends React.Component {
  state = {
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
    await this.props.userSignIn(this.state);
    if (this.props.loginError) {
      ToastAndroid.showWithGravityAndOffset(
        'Wystąpił błąd podczas logowania',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    }
  };

  render() {
    const {email, password} = this.state;
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
                name="Email"
                value={email}
                onChangeFn={(value) => this.handleChange('email', value)}
              />
              <Input
                primary
                name="Hasło"
                value={password}
                onChangeText={(value) => this.handleChange('password', value)}
                secureTextEntry
              />
              <Button title="Zaloguj Się" onPress={this.handleSubmit} />
              <Text
                style={styles.hint}
                onPress={() => NavigationService.navigate('SignUp', null)}>
                Nie Posiadasz Konta?{' '}
                <Text style={{fontWeight: 'bold'}}>Zarejestruj Się</Text>
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
    loginError: state.user.error.signIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userSignIn: (userInfo) => dispatch(userSignIn(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

SignInScreen.propTypes = {
  userSignIn: PropTypes.func.isRequired,
  loginError: PropTypes.bool.isRequired,
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
