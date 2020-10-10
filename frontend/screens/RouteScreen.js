import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import PropTypes from 'prop-types';
import {routeList} from '../_actions';
import NavigationService from '../NavigationService';

class RouteScreen extends React.Component {
  componentDidMount() {
    const {routeList: propsRouteList} = this.props;
    propsRouteList();
  }

  handleBack = () => {
    NavigationService.goBack();
  };

  render() {
    const {routes, email} = this.props;
    const routesList = routes.filter((route) => route.driver.email === email);

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerTouchable}
            onPress={this.handleBack}>
            <Icon name="keyboard-backspace" size={24} color="#000" />
            <Text style={styles.headerTitle}>Moja Historia Tras</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={routesList}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                <TouchableOpacity
                  style={{padding: 15}}
                  onPress={() => NavigationService.navigate('RouteMap', item)}>
                  <Text>
                    Data:{' '}
                    <Text style={{fontWeight: 'bold'}}>
                      {moment(item.startTrace).format('DD/MM/YYYY')}
                    </Text>
                  </Text>
                  <Text>Samochód: {item.carVin} </Text>
                  <Text>Cel wyjazdu: {item.purpose}</Text>
                  <Text>Dystans: {item.distance.toFixed(2)} km</Text>
                  <Text>
                    Czas trwania:{' '}
                    {moment(
                      moment(item.stopTrace).diff(moment(item.startTrace))
                    )
                      .utc()
                      .format('HH:mm:ss')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.user.user.email,
    routes: state.route.routes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  routeList: () => dispatch(routeList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteScreen);

RouteScreen.propTypes = {
  routeList: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      carVin: PropTypes.string,
      startTrace: PropTypes.instanceOf(Date),
      stopTrace: PropTypes.instanceOf(Date),
      distance: PropTypes.number,
      purpose: PropTypes.string,
      driver: PropTypes.shape({
        email: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
      markers: PropTypes.arrayOf(
        PropTypes.shape({
          coordinate: PropTypes.shape({
            longitude: PropTypes.number,
            latitude: PropTypes.number,
          }),
          key: PropTypes.number,
        })
      ),
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTouchable: {
    paddingHorizontal: 10,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 15,
    fontWeight: 'bold',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
});
