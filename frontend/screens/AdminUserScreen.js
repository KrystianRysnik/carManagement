import React from 'react';
import { Alert, View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { userList, userDelete } from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';

class AdminUserScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.userList()
    }

    handleDelete = user => {
        Alert.alert(
            `Usuwanie Użytkownika`,
            `Czy napewno chcesz usunąć użytkownika ${user.firstName} ${user.lastName} z adresem email ${user.email}?`,
            [
                {
                    text: 'Anuluj',
                    style: 'cancel',
                },
                {
                    text: 'Usuń',
                    onPress: () => this.props.userDelete(user.email)
                 },
            ],
            { cancelable: false },
        )

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: 45, flexDirection: 'row', alignItems: 'center' }} onPress={() => NavigationService.navigate('Admin')}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Zarządzanie Użytkownikami</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList data={this.props.users} style={{ flex: 1 }}
                        renderItem={({ item }) => (
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e3e3e3' }}>
                                <View style={{ padding: 15 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.firstName} {item.lastName}</Text>
                                    <Text>{item.email}</Text>
                                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', right: 20, top: 10 }}>
                                        <View style={{ width: 32, height: 32, backgroundColor: '#f39c12', borderWidth: 1, borderColor: '#e67e22', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={0.5} onPress={() => NavigationService.navigate('AddEditUser', item)}>
                                                <Icon name='edit' size={28} color='#fff' />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginLeft: 15, width: 32, height: 32, backgroundColor: '#e74c3c', borderWidth: 1, borderColor: '#c0392b', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.handleDelete(item)}>
                                                <Icon name='delete-forever' size={28} color='#fff' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item => item.email)}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
    };
}

const mapDispatchToProps = dispatch => ({
    userList: () => dispatch(userList()),
    userDelete: email => dispatch(userDelete(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserScreen);
