import AsyncStorage from '@react-native-community/async-storage';
import {carsList} from './car_actions';
import NavigationService from '../NavigationService';
import {instance} from '../settings';

export const userSignUp = (user) => {
  return async (dispatch) => {
    try {
      const response = await instance.post('/user/register', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
      const data = await response.data;
      AsyncStorage.setItem('@token', data.token);
      dispatch(setToken(data.token));
      dispatch(loginUser(data.user));
      dispatch(carsList());
      NavigationService.navigate('App', null);
      console.log('🟢 Register Succesfull!');
    } catch (err) {
      console.log('🔴 Register Error!');
      console.log(err);
    }
  };
};

export const userSignIn = (user) => {
  return async (dispatch) => {
    try {
      const response = await instance.post('/user/login', {
        email: user.email,
        password: user.password,
      });
      const data = await response.data;
      AsyncStorage.setItem('@token', data.token);
      dispatch(setToken(data.token));
      dispatch(loginUser(data.user));
      dispatch(carsList());
      NavigationService.navigate('App', null);
      console.log('🟢 Login Succesfull! /w Login Form');
    } catch (err) {
      console.log('🔴 Login Error! /w Login Form');
      console.log(error);
    }
  };
};

export const userSignOut = (token) => {
  return async (dispatch) => {
    try {
      const response = await instance.post(
        '/user/logout',
        {},
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      AsyncStorage.removeItem('@token');
      dispatch(logoutUser());
      dispatch(removeToken());
      NavigationService.navigate('Auth', null);
      console.log('🟢 Logout Succesfull!');
    } catch (err) {
      console.log('🔴 Logout Error!');
      console.log(err);
    }
  };
};

export const userProfileUpdate = (user) => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.put(
        '/user/profile/update',
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        {
          headers: {Authorization: `Bearer ${getState().user.token}`},
        }
      );
      const data = await response.data;
      dispatch(loginUser(data));
      dispatch(updateUserSuccess());
      console.log('🟢 Update User Succesfull!');
    } catch (err) {
      dispatch(updateUserError());
      console.log('🔴 Update User Error!');
      console.log(err);
    }
  };
};

export const userAdd = (user) => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.post(
        '/user/add',
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          role: user.role,
        },
        {
          headers: {Authorization: `Bearer ${getState().user.token}`},
        }
      );
      const data = await response.data;
      dispatch(addUser(data));
      dispatch(addUserSuccess());
      console.log('🟢 Add User Succesfull!');
    } catch (err) {
      dispatch(addUserError());
      console.log('🔴 Add User Error!');
      console.log(err);
    }
  };
};

export const userUpdate = (user) => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.put(
        '/user/update',
        {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        {
          headers: {Authorization: `Bearer ${getState().user.token}`},
        }
      );
      dispatch(
        updateUser({
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        })
      );
      dispatch(updateUserSuccess());
      console.log('🟢 Update User Succesfull!');
    } catch (err) {
      dispatch(updateUserError());
      console.log('🔴 Update User Error!');
      console.log(err);
    }
  };
};

export const userDelete = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.delete(`/user/delete/${id}`, {
        headers: {Authorization: `Bearer ${getState().user.token}`},
      });
      dispatch(deleteUser(id));
      dispatch(deleteUserSuccess());
      console.log('🟢 Delete User Succesfull!');
    } catch (err) {
      dispatch(deleteUserError());
      console.log('🔴 Delete Car Error!');
      console.log(err);
    }
  };
};

export const userProfile = (token) => {
  return async (dispatch) => {
    if (token) {
      try {
        const response = await instance.get('/user/profile', {
          headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.data;
        dispatch(loginUser(data));
        dispatch(setToken(token));
        dispatch(carsList());
        NavigationService.navigate('App', null);
        console.log('🟢 Login Succesfull! /w Reopen App');
      } catch (err) {
        AsyncStorage.removeItem('token');
        NavigationService.navigate('Auth', null);
        console.log('🔴 Login Error! /w Reopen App');
        console.log(err);
      }
    } else {
      NavigationService.navigate('Auth', null);
    }
  };
};

export const userList = () => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.get('/user/list', {
        headers: {Authorization: `Bearer ${getState().user.token}`},
      });
      const data = await response.data;
      dispatch(listUser(data));
      console.log('🟢 List User Succesfull!');
    } catch (err) {
      console.log('🔴 List User Error!');
      console.log(err);
    }
  };
};

const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token,
});

const removeToken = () => ({
  type: 'REMOVE_TOKEN',
});

const loginUser = (userObj) => ({
  type: 'LOGIN_USER',
  payload: userObj,
});

const listUser = (userObj) => ({
  type: 'LIST_USER',
  payload: userObj,
});

const logoutUser = () => ({
  type: 'LOGOUT_USER',
});

const addUser = (user) => ({
  type: 'ADD_USER',
  payload: user,
});

const updateUser = (user) => ({
  type: 'UPDATE_USER',
  payload: user,
});

const deleteUser = (id) => ({
  type: 'DELETE_USER',
  payload: id,
});

const addUserSuccess = () => ({
  type: 'ADD_USER_SUCCESS',
});

const addUserError = () => ({
  type: 'ADD_USER_ERROR',
});

const updateUserSuccess = () => ({
  type: 'UPDATE_USER_SUCCESS',
});

const updateUserError = () => ({
  type: 'UPDATE_USER_ERROR',
});

const deleteUserSuccess = () => ({
  type: 'DELETE_USER_SUCCESS',
});

const deleteUserError = () => ({
  type: 'DELETE_USER_ERROR',
});
