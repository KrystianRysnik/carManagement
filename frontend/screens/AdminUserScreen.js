import React from 'react';
import {
  Alert,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {userList, userDelete} from '../_actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../NavigationService';

class AdminUserScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.userList();
  }

  handleDelete = (user) => {
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
          onPress: async () => {
            await this.props.userDelete(user._id);
            if (this.props.error.delete == false) {
              ToastAndroid.showWithGravityAndOffset(
                'Pomyśline usunięto użytkownika',
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
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerTouchable}
            onPress={() => NavigationService.navigate('Admin')}>
            <Icon name="keyboard-backspace" size={24} color="#000" />
            <Text style={styles.headerTitle}>Zarządzanie Użytkownikami</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={this.props.users}
            style={{flex: 1}}
            renderItem={({item}) => (
              <View style={styles.itemList}>
                <Text style={{fontWeight: 'bold'}}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text>{item.email}</Text>
                {item.role === 'admin' && (
                  <Text style={{fontWeight: 'bold', color: 'red'}}>
                    Posiada uprawnienia administratora
                  </Text>
                )}
                <View style={styles.buttons}>
                  <View style={styles.editBtn}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() =>
                        NavigationService.navigate('AddEditUser', item)
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
    error: state.user.error,
    users: state.user.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userList: () => dispatch(userList()),
  userDelete: (email) => dispatch(userDelete(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserScreen);

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
