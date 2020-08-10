import React from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {routeDelete, routeList} from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';
import moment from 'moment';

class AdminRouteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: '',
      routes: [],
    };
  }

  componentDidMount() {
    this.props.routeList();
  }

  handleDelete = (route) => {
    Alert.alert(
      `Usuwanie Trasy`,
      `Czy napewno chcesz usunąć trasę z dnia ${moment(route.startTrace).format(
        'DD/MM/YYYY',
      )}?`,
      [
        {
          text: 'Anuluj',
          style: 'cancel',
        },
        {
          text: 'Usuń',
          onPress: async () => {
            await this.props.routeDelete(route._id);
            if (this.props.error.delete == false) {
              ToastAndroid.showWithGravityAndOffset(
                'Pomyślnie usunięto trase',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50,
              );
            } else {
              ToastAndroid.showWithGravityAndOffset(
                'Wystąpił błąd podczas usuwania trasy',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50,
              );
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {routes} = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerTouchable}
            onPress={() => NavigationService.navigate('Admin')}>
            <Icon name="keyboard-backspace" size={24} color="#000" />
            <Text style={styles.headerTitle}>Historia Tras</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={routes}
            renderItem={({item}) => (
              <View style={styles.itemList}>
                <Text>
                  Data:{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    {moment(item.startTrace).format('DD/MM/YYYY')}
                  </Text>
                </Text>
                <Text>
                  Kierowca: {item.driver.firstName} {item.driver.lastName}
                </Text>
                <Text>Samochód: {item.carVin} </Text>
                <Text>Cel wyjazdu: {item.purpose}</Text>
                <Text>Dystans: {item.distance.toFixed(2)} km</Text>
                <Text>
                  Czas trwania:{' '}
                  {moment(moment(item.stopTrace).diff(moment(item.startTrace)))
                    .utc()
                    .format('HH:mm:ss')}
                </Text>

                <View style={styles.buttons}>
                  <View style={styles.editBtn}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() =>
                        NavigationService.navigate('EditRoute', item)
                      }>
                      <Icon name="edit" size={28} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.removeBtn}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.handleDelete(item)}>
                      <Icon name="delete-forever" size={28} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
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
    error: state.route.error,
    routes: state.route.routes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  routeDelete: (id) => dispatch(routeDelete(id)),
  routeList: () => dispatch(routeList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminRouteScreen);

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
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemList: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 20,
    top: 10,
  },
  editBtn: {
    width: 32,
    height: 32,
    backgroundColor: '#f39c12',
    borderWidth: 1,
    borderColor: '#e67e22',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtn: {
    marginLeft: 15,
    width: 32,
    height: 32,
    backgroundColor: '#e74c3c',
    borderWidth: 1,
    borderColor: '#c0392b',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
