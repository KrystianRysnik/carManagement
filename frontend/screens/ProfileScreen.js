import React from 'react';
import { AsyncStorage, View, Text, Button } from 'react-native';
import store from '../_store/store';
import { connect } from 'react-redux';
import { userSignOut } from '../_actions';

class ProfileScreen extends React.Component {

    handleClick = async () => {
        const token = await AsyncStorage.getItem('token')
        this.props.userSignOut(token)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Profile Screen</Text>
                <Text>Name: {store.getState().user.currentUser.name}</Text>
                <Text>Email: {store.getState().user.currentUser.email}</Text>
                <Button title="Sign Out" onPress={this.handleClick}  />
            </View>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    userSignOut: token => dispatch(userSignOut(token))
})

export default connect(null, mapDispatchToProps)(ProfileScreen);