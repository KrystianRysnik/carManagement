import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class LicensePlate extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        style: PropTypes.style
    }

    render() {
        return (
            <View style={{ marginVertical: 5, borderWidth: 1, borderRadius: 3, maxWidth: 130, maxHeight: 29, width: 130, height: 29, flex: 1, flexDirection: 'row' }}>
                <View style={{ maxWidth: 18, height: 27, backgroundColor: '#003295', flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}><Text style={{ marginBottom: 1, color: '#fff', fontSize: 9, fontWeight: 'bold' }}>PL</Text></View>
                <View style={{ width: 79, height: 27, backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontWeight: 'bold', fontSize: 19 }}>{this.props.value}</Text></View>
            </View>
        )
    }
}
