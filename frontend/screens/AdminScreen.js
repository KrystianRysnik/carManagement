import React from 'react';
import { View, ScrollView, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';

class AdminScreen extends React.Component {
    handleBack = () => {
        NavigationService.goBack()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Panel Administratora</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>

                    <View style={{ paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }} >
                        <Icon name='people' size={36} color='#000' />
                        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingLeft: 15 }}>Użytkownicy</Text>
                    </View>

                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '33.33%', paddingHorizontal: 5 }}>
                            <Button title="DODAJ" color='#2ecc71'/>
                        </View>
                        <View style={{ width: '33.33%', paddingHorizontal: 5  }}>
                            <Button title="EDYTUJ" color='#f39c12' />
                        </View>
                        <View style={{ width: '33.33%', paddingHorizontal: 5  }}>
                            <Button title="USUŃ" color='#e74c3c' />
                        </View>
                    </View>

                    <View style={{ paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }} >
                        <Icon name='directions-car' size={36} color='#000' />
                        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingLeft: 15 }}>Pojazdy</Text>
                    </View>

                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '33.33%', paddingHorizontal: 5 }}>
                            <Button title="DODAJ" color='#2ecc71'/>
                        </View>
                        <View style={{ width: '33.33%', paddingHorizontal: 5  }}>
                            <Button title="EDYTUJ" color='#f39c12' />
                        </View>
                        <View style={{ width: '33.33%', paddingHorizontal: 5  }}>
                            <Button title="USUŃ" color='#e74c3c' />
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}



const mapStateToProps = state => {
    return {
        profile: state.user.currentUser,
    };
}

export default connect(mapStateToProps)(AdminScreen);