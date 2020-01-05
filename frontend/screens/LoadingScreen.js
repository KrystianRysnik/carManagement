import React from 'react';
import { View, ActivityIndicator, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { userProfile } from '../_actions';

class LoadingScreen extends React.Component {
    componentDidMount() {
        this.requestForPermission()
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const token = await AsyncStorage.getItem('@token');
        this.props.userProfile(token)
    }

    requestForPermission = async () => {
        try {
            if (Platform.OS === "android") {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                ]);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the location & external storage');
                } else {
                    console.log('Location and/or external storage permission denied');
                }
            }
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userProfile: token => dispatch(userProfile(token))
})

export default connect(null, mapDispatchToProps)(LoadingScreen);