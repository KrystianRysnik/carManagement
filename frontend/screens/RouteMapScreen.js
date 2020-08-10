import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {routeGet} from '../_actions';
import NavigationService from '../NavigationService';

class RouteMapScreen extends React.Component {
  state = {
    isLoading: true,
  };

  mapRef = null;

  async init(item) {
    await this.props.routeGet(item._id, true);
    const {markers} = this.props.route;

    this.mapRef.fitToCoordinates(
      markers.map((marker) => marker.coordinate),
      {edgePadding: {top: 10, right: 10, bottom: 10, left: 10}, animated: true}
    );
    this.setState({isLoading: false});
  }

  componentDidMount() {
    const item = this.props.navigation.state.params;
    this.init(item);
  }

  componentDidUpdate(prevProps) {
    const item = this.props.navigation.state.params;
    if (item != prevProps.navigation.state.params) {
      this.setState({isLoading: true});
      this.init(item);
    }
  }

  handleBack = () => {
    NavigationService.navigate('Routes');
  };

  render() {
    const {route} = this.props;
    const {isLoading} = this.state;

    return (
      <View style={{flex: 1}}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          showsUserLocation={false}
          showsMyLocationButton={false}
          rotateEnabled={false}
          showsCompass={false}
          ref={(ref) => {
            this.mapRef = ref;
          }}
          onLayout={() => {
            route.markers != undefined &&
              this.mapRef.fitToCoordinates(
                route.markers.map((marker) => marker.coordinate),
                {
                  edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
                  animated: true,
                }
              );
          }}>
          {!isLoading && (
            <Polyline
              coordinates={route.markers.map((marker) => marker.coordinate)}
              strokeWidth={5}
            />
          )}
        </MapView>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerTouchable}
            onPress={this.handleBack}>
            <Icon name="keyboard-backspace" size={24} color="#000" />
            <Text style={styles.headerTitle}>
              Trasa z {moment(route.startTrace).format('DD/MM/YYYY')}{' '}
            </Text>
          </TouchableOpacity>
        </View>

        {isLoading && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}>
            <ActivityIndicator size="large" />
            <Text>Pobieranie trasy...</Text>
          </View>
        )}

        <View style={styles.details}>
          <View style={{width: '50%'}}>
            <Text style={styles.detailsSubheading}>DYSTANS</Text>
            <Text style={styles.detailsHeading}>
              {parseFloat(route.distance).toFixed(2)} km
            </Text>
          </View>
          <View style={{width: '50%'}}>
            <Text style={styles.detailsSubheading}>CZAS TRWANIA</Text>
            <Text style={styles.detailsHeading}>
              {moment(moment(route.stopTrace).diff(moment(route.startTrace)))
                .utc()
                .format('HH:mm:ss')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    route: state.route.route,
  };
};

const mapDispatchToProps = (dispatch) => ({
  routeGet: (id, withMarkers) => dispatch(routeGet(id, withMarkers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteMapScreen);

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
  details: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  detailsSubheading: {
    textAlign: 'center',
    fontSize: 12,
  },
  detailsHeading: {
    textAlign: 'center',
    fontSize: 24,
  },
});
