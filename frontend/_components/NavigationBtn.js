import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const NavigationBtn = ({title, icon, userRole}) => {
  return userRole === 'admin' && title && icon ? (
    <View style={styles.container}>
      <Icon name={icon} size={24} color="#666666" />
      <Text style={styles.title}>{title}</Text>
    </View>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    userRole: state.user.user.role,
  };
};

export default connect(mapStateToProps)(NavigationBtn);

NavigationBtn.propTypes = {
  userRole: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string,
};

NavigationBtn.defaultProps = {
  title: null,
  icon: null,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  title: {
    width: '100%',
    marginLeft: 32,
    fontWeight: 'bold',
    color: '#343434',
  },
});
