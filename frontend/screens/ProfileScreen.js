import React from 'react';
import { AsyncStorage, View, Text, Button } from 'react-native';
import store from '../_store/store';

export default class ProfileScreen extends React.Component {

    handleClick = () => {
        AsyncStorage.removeItem('token');
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