import React from 'react';
import {
  View,
  ScrollView,
  Text,
  ToastAndroid,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {userAdd, userUpdate} from '../_actions';
import NavigationService from '../NavigationService';
import Input from '../_components/Input';

class AdminUserCuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      checked: false,
      disableButton: true,
    };
  }

  componentDidMount() {
    const item = this.props.navigation.state.params;
    this._refreshState(item);
  }

  componentDidUpdate(prevProps) {
    const item = this.props.navigation.state.params;
    if (item !== prevProps.navigation.state.params) {
      this._refreshState(item);
    }
  }

  _refreshState = (item) => {
    this.setState({
      _id: `${item._id}`,
      firstName: `${item.firstName}`,
      lastName: `${item.lastName}`,
      email: `${item.email}`,
      password: '',
      role: `${item.role}`,
      checked: item.role === 'admin',
      disableButton: true,
    });
  };

  handleBack = () => {
    NavigationService.navigate('Admin');
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

  handlePrivilegeChange = () => {
    this.setState(
      (prevState) => ({
        checked: !prevState.checked,
        role: !prevState.checked ? 'admin' : 'user',
      }),
      () => this.checkDifferences()
    );
  };

  checkDifferences = () => {
    const item = this.props.navigation.state.params;
    if (
      (this.state.firstName === item.firstName &&
        this.state.lastName === item.lastName &&
        this.state.email === item.email &&
        this.state.role === item.role) ||
      (this.state.password === '' && item.email === '') ||
      this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.email === ''
    )
      this.setState({disableButton: true});
    else this.setState({disableButton: false});
  };

  handleUpdate = async () => {
    await this.props.userUpdate(this.state);
    if (this.props.error.update) {
      ToastAndroid.showWithGravityAndOffset(
        'Wystąpił błąd podczas aktualizacji użytkownika',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Pomyślnie zaktualizowano użytkownika',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
      this.setState({disableButton: true});
    }
  };

  handleCreate = async () => {
    await this.props.userAdd(this.state);
    if (this.props.error.add) {
      ToastAndroid.showWithGravityAndOffset(
        'Wystąpił błąd podczas dodawania użytkownika',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Pomyślnie dodano użytkownika',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
      this.setState({disableButton: true});
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerTouchable}
            onPress={this.handleBack}>
            <Icon name="keyboard-backspace" size={24} color="#000" />
            {this.props.navigation.state.params.email === '' ? (
              <Text style={styles.headerTitle}>Dodawanie Użytkownika</Text>
            ) : (
              <Text style={styles.headerTitle}>Edytowanie Użytkownika</Text>
            )}
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <Input
              name="Email"
              value={this.state.email}
              onChangeFn={(value) => this.handleChange('email', value)}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '45%'}}>
                <Input
                  name="Imię"
                  value={this.state.firstName}
                  onChangeFn={(value) => this.handleChange('firstName', value)}
                />
              </View>
              <View style={{width: '45%'}}>
                <Input
                  name="Nazwisko"
                  value={this.state.lastName}
                  onChangeFn={(value) => this.handleChange('lastName', value)}
                />
              </View>
            </View>
            {this.props.navigation.state.params.email === '' && (
              <Input
                name="Hasło"
                value={this.state.password}
                onChangeFn={(value) => this.handleChange('password', value)}
              />
            )}
            <View style={{flexDirection: 'row', paddingTop: 15}}>
              <CheckBox
                value={this.state.checked}
                onValueChange={this.handlePrivilegeChange}
              />
              <Text style={{marginTop: 5}}> Uprawnienia administratora</Text>
            </View>
          </View>
          <View style={styles.container}>
            {this.props.navigation.state.params.email === '' ? (
              <Button
                title="DODAJ UŻYTKOWNIKA"
                color="#2ecc71"
                onPress={this.handleCreate}
                disabled={this.state.disableButton}
              />
            ) : (
              <Button
                title="EDYTUJ UŻYTKOWNIKA"
                color="#2ecc71"
                onPress={this.handleUpdate}
                disabled={this.state.disableButton}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userAdd: (user) => dispatch(userAdd(user)),
  userUpdate: (user) => dispatch(userUpdate(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserCuScreen);

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
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 5,
    color: '#000',
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  inputLabel: {
    marginTop: 20,
    color: '#000',
  },
});
