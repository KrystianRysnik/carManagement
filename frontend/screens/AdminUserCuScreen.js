import React from 'react'
import { View, ScrollView, Text, ToastAndroid, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux'
import { userAdd, userUpdate } from '../_actions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../NavigationService'

class AdminUserCuScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            checked: false,
            disableButton: true
        }
    }

    componentDidMount() {
        let item = this.props.navigation.state.params
        this._refreshState(item)
    }

    componentDidUpdate(prevProps) {
        let item = this.props.navigation.state.params
        if (item != prevProps.navigation.state.params) {
            this._refreshState(item)
        }
    }

    _refreshState = (item) => {
        setTimeout(() => {
            this.setState({
                _id: `${item._id}`,
                firstName: `${item.firstName}`,
                lastName: `${item.lastName}`,
                email: `${item.email}`,
                password: '',
                role: `${item.role}`,
                checked: item.role == 'admin' ? true : false,
                disableButton: true
            })
        }, 500)
    }

    handleBack = () => {
        NavigationService.navigate('Admin')
    }

    handleEmailChange = async email => {
        await this.setState({ email: email })
        this.checkDifferences()
    }

    handleFirstNameChange = async firstName => {
        await this.setState({ firstName: firstName })
        this.checkDifferences()
    }

    handleLastNameChange = async lastName => {
        await this.setState({ lastName: lastName })
        this.checkDifferences()
    }

    handlePasswordChange = async password => {
        await this.setState({ password: password })
        this.checkDifferences()
    }

    handlePrivilegeChange = async checked => {
        await this.setState({
            checked: !this.state.checked,
            role: !this.state.checked ? 'admin' : 'user'
        })
        this.checkDifferences()
    }

    checkDifferences = () => {
        let item = this.props.navigation.state.params
        if (this.state.firstName == item.firstName
            && this.state.lastName == item.lastName
            && this.state.email == item.email
            && this.state.role == item.role
            || (this.state.password == '' && item.email == '')
            || this.state.firstName == ''
            || this.state.lastName == ''
            || this.state.email == '')
            this.setState({ disableButton: true })
        else
            this.setState({ disableButton: false })

        console.log(this.state)
    }

    handleUpdate = async () => {
        await this.props.userUpdate(this.state)
        setTimeout(() => {
            if (this.props.error.update == true) {
                ToastAndroid.showWithGravityAndOffset(
                    'Wystąpił błąd podczas aktualizacji użytkownika',
                    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
                );
            }
            else {
                ToastAndroid.showWithGravityAndOffset(
                    'Pomyślnie zaktualizowano użytkownika',
                    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
                );
                this.setState({ disableButton: true })
            }
        }, 250)
    }

    handleCreate = async () => {
        await this.props.userAdd(this.state)
        setTimeout(() => {
            if (this.props.error.add == true) {
                ToastAndroid.showWithGravityAndOffset(
                    'Wystąpił błąd podczas dodawania użytkownika',
                    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
                )
            }
            else {
                ToastAndroid.showWithGravityAndOffset(
                    'Pomyślnie dodano użytkownika',
                    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50
                )
                this.setState({ disableButton: true })
            }
        }, 250)
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerTouchable} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        {this.props.navigation.state.params.email == '' ? (
                            <Text style={styles.headerTitle}>Dodawanie Użytkownika</Text>
                        ) : (
                                <Text style={styles.headerTitle}>Edytowanie Użytkownika</Text>
                            )}
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Text style={{ color: '#000' }}>Email</Text>
                        <TextInput
                            value={this.state.email}
                            onChangeText={this.handleEmailChange}
                            style={styles.input}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '45%' }}>
                                <Text style={styles.inputLabel}>Imię</Text>
                                <TextInput
                                    value={this.state.firstName}
                                    onChangeText={this.handleFirstNameChange}
                                    style={styles.input}
                                />
                            </View>
                            <View style={{ width: '45%' }}>
                                <Text style={styles.inputLabel}>Nazwisko</Text>
                                <TextInput
                                    value={this.state.lastName}
                                    onChangeText={this.handleLastNameChange}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        {this.props.navigation.state.params.email == '' && (
                            <Text style={styles.inputLabel}>Hasło</Text>

                        )}
                        {this.props.navigation.state.params.email == '' && (<TextInput
                            value={this.state.password}
                            onChangeText={this.handlePasswordChange}
                            style={styles.input}
                        />
                        )}

                        <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                            <CheckBox
                                value={this.state.checked}
                                onValueChange={this.handlePrivilegeChange}
                            />
                            <Text style={{ marginTop: 5 }}> Uprawnienia administratora</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        {this.props.navigation.state.params.email == '' ? (
                            <Button title="DODAJ UŻYTKOWNIKA" color='#2ecc71' onPress={this.handleCreate} disabled={this.state.disableButton} />
                        ) : (
                                <Button title="EDYTUJ UŻYTKOWNIKA" color='#2ecc71' onPress={this.handleUpdate} disabled={this.state.disableButton} />
                            )}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.user.error
    }
}

const mapDispatchToProps = dispatch => ({
    userAdd: user => dispatch(userAdd(user)),
    userUpdate: user => dispatch(userUpdate(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserCuScreen)

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTouchable: {
        paddingHorizontal: 10,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        marginLeft: 15,
        fontWeight: 'bold'
    },
    container: {
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    input: {
        paddingVertical: 5,
        color: '#000',
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1
    },
    inputLabel: {
        marginTop: 20,
        color: '#000'
    }
})