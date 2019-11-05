import React from 'react';
import { AsyncStorage, View, ActivityIndicator, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { userProfile } from '../_actions';

class LoadingScreen extends React.Component {
    componentDidMount() {
       this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const token = await AsyncStorage.getItem('token');
        this.props.userProfile(token)
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="Default" />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userProfile: token => dispatch(userProfile(token))
})

export default connect(null, mapDispatchToProps)(LoadingScreen);