import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {userSignOut, userProfileUpdate} from '../_actions';
import NavigationService from '../NavigationService';
import Input from '../_components/Input';

class ProfileScreen extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    disableButton: true,
  };

  componentDidMount() {
    const {
      user: {firstName, lastName, email},
    } = this.props;
    this.setState({
      firstName,
      lastName,
      email,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const {
        user: {firstName, lastName, email},
      } = this.props;
      this.setState({
        firstName,
        lastName,
        email,
      });
    }
  }

  handleLogout = async () => {
    const token = await AsyncStorage.getItem('@token');
    const {userSignOut: propsUserSignOut} = this.props;
    propsUserSignOut(token);
  };

  handleUpdate = () => {
    const {userProfileUpdate: propsUserProfileUpdate} = this.props;
    propsUserProfileUpdate(this.state);
    this.setState({disableButton: true});
  };

  handleBack = () => {
    NavigationService.goBack();
  };

  checkDifferences = () => {
    const {
      user: {firstName: propsFirstName, lastName: propsLastName},
    } = this.props;
    const {firstName, lastName} = this.state;
    if (
      (firstName === propsFirstName && lastName === propsLastName) ||
      firstName === '' ||
      lastName === ''
    )
      this.setState({disableButton: true});
    else this.setState({disableButton: false});
  };

  handleChange = (name, value) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        [name]: value,
      }),
      () => this.checkDifferences()
    );
  };

  render() {
    const {email, firstName, lastName, disableButton} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerTouchable}
            onPress={this.handleBack}>
            <Icon name="keyboard-backspace" size={24} color="#000" />
            <Text style={styles.headerTitle}>Profil</Text>
          </TouchableOpacity>
          <Text style={styles.headerSubtitle} onPress={this.handleLogout}>
            Wyloguj się
          </Text>
        </View>

        <View style={{flex: 1}}>
          <View style={styles.container}>
            <Input
              name="Email"
              value={email}
              onChangeFn={(value) => this.handleChange('email', value)}
              editable={false}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '45%'}}>
              <Input
                name="Imię"
                value={firstName}
                onChangeFn={(value) => this.handleChange('firstName', value)}
              />
            </View>
            <View style={{width: '45%'}}>
              <Input
                name="Nazwisko"
                value={lastName}
                onChangeFn={(value) => this.handleChange('lastName', value)}
              />
            </View>
          </View>
          <View style={styles.container}>
            <Button
              title="Aktualizuj Profil"
              onPress={this.handleUpdate}
              disabled={disableButton}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userSignOut: (token) => dispatch(userSignOut(token)),
  userProfileUpdate: (user) => dispatch(userProfileUpdate(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTouchable: {
    paddingHorizontal: 10,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 15,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    paddingHorizontal: 10,
    lineHeight: 45,
    fontSize: 10,
    color: '#8f8f8f',
    textTransform: 'uppercase',
  },
  separator: {
    marginVertical: 8,
    width: '100%',
    height: 1,
    backgroundColor: '#b6b6b6',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  input: {
    paddingVertical: 5,
    color: '#000',
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
});
