import React from 'react'
import { connect } from 'react-redux'
import { View, Text, ImageBackground } from 'react-native'
import NavigationService from '../NavigationService'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'


class AdminBtn extends React.Component {
    render() {
        const { user } = this.props

        return (user.role === 'admin' ?
            (<TouchableNativeFeedback
                onPress={this._onPressButton}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 10 }}>
                    <Icon name='security' size={24} color='#666666' />
                    <Text style={{ width: '100%', marginLeft: 32, fontWeight: 'bold', color: '#343434' }}>Panel administratora</Text>
                </View>
            </TouchableNativeFeedback>
            ) : (null))
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps)(AdminBtn)