import React from 'react';
import {
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Text,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {userProfile} from '../_actions';

class LoadingScreen extends React.Component {
  componentDidMount() {
    this.requestForPermission();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('@token');
    this.props.userProfile(token);
  };

  requestForPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
        <Text>Ładowanie</Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userProfile: (token) => dispatch(userProfile(token)),
});

export default connect(null, mapDispatchToProps)(LoadingScreen);

LoadingScreen.propTypes = {
  userProfile: PropTypes.func.isRequired,
};
