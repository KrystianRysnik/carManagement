import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const LicensePlate = ({value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.country}>PL</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default LicensePlate;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    maxWidth: 130,
    maxHeight: 29,
    width: 130,
    height: 29,
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
  },
  left: {
    maxWidth: 18,
    height: 27,
    backgroundColor: '#003295',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  right: {
    width: 79,
    height: 27,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  country: {
    marginBottom: 1,
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  value: {
    fontWeight: 'bold',
    fontSize: 19,
  },
});
