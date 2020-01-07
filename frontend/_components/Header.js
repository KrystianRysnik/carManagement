import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ImageBackground } from 'react-native';
import NavigationService from '../NavigationService';

class Header extends React.Component {
    render() {
        return (<View>
            <ImageBackground source={require('../_assets/background.png')} style={{ width: '100%' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ margin: 15, height: 50, width: 50, borderRadius: 25, backgroundColor: '#b6b6b6' }}>
                        <Text style={{ textAlign: 'center', lineHeight: 50, color: '#ffffff', fontSize: 26, textTransform: 'uppercase' }}>{this.props.currentUser.firstName != undefined && this.props.currentUser.firstName.charAt(0)}{this.props.currentUser.lastName != undefined && this.props.currentUser.lastName.charAt(0)}</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: 'bold' }}>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</Text>
                        <Text style={{ color: '#ffffff', fontSize: 10 }} onPress={() => NavigationService.navigate('Profile')}>Zobacz profil</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>)
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
    };
}

export default connect(mapStateToProps)(Header);