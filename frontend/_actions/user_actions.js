import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { carsList } from './car_actions';
import NavigationService from '../NavigationService';


const instance = axios.create({
    //baseURL: 'http://192.168.0.19:3000'
    baseURL: 'https://car-management-backend.herokuapp.com/'
});

//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


export const userSignUp = user => {
    return dispatch => {
        instance.post('/user/register', {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        })
            .then(res => {
                console.log('🟢 Register Succesfull!')
                AsyncStorage.setItem('@token', res.data.token)
                dispatch(loginUser(res.data.user))
                dispatch(carsList())
                NavigationService.navigate('App', null)
            })
            .catch(error => {
                console.log('🔴 Register Error!')
                console.log(error);
            })
    }
}

export const userSignIn = user => {
    return dispatch => {
        instance.post('/user/login', {
            email: user.email,
            password: user.password
        })
            .then(res => {
                console.log('🟢 Login Succesfull! /w Login Form')
                AsyncStorage.setItem('@token', res.data.token)
                dispatch(loginUser(res.data.user))
                dispatch(carsList())
                NavigationService.navigate('App', null)
            })
            .catch(error => {
                console.log('🔴 Login Error! /w Login Form')
                console.log(error);
            })
    }
}

export const userSignOut = token => {
    return dispatch => {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        instance.post('/user/logout')
            .then(res => {
                console.log('🟢 Logout Succesfull!')
                AsyncStorage.removeItem('@token')
                dispatch(logoutUser())
                NavigationService.navigate('Auth', null)
            })
            .catch(error => {
                console.log('🔴 Logout Error!')
                console.log(error);
            })
    }
}

export const userProfileUpdate = user => {
    return dispatch => {
        instance.put('/user/profile/update', {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        })
            .then(res => {
                dispatch(loginUser(res.data))
                console.log('🟢 Update User Succesfull!')
            })
            .catch(error => {
                console.log('🔴 Update Car Error!')
                console.log(error);
            })
    }
}

export const userAdd = user => {
    return dispatch => {
        instance.post('/user/add', {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        })
            .then(res => {
                console.log('🟢 Add User Succesfull!')
                dispatch(addUser(res.data))
            })
            .catch(error => {
                console.log('🔴 Add User Error!')
                console.log(error);
            })
    }
}


export const userUpdate = user => {
    return dispatch => {
        instance.put('/user/update', {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        })
            .then(res => {
                dispatch(updateUser({
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }))
                console.log('🟢 Update User Succesfull!')
            })
            .catch(error => {
                console.log('🔴 Update Car Error!')
                console.log(error);
            })
    }
}

export const userDelete = id => {
    return dispatch => {
        instance.delete(`/user/delete/${id}`)
            .then(res => {
                dispatch(deleteUser(id))
                console.log('🟢 Delete User Succesfull!')
            })
            .catch(error => {
                console.log('🔴 Delete Car Error!')
                console.log(error);
            })
    }
}

export const userProfile = token => {
    return dispatch => {
        if (token) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            instance.get('/user/profile')
                .then(res => {
                    console.log('🟢 Login Succesfull! /w Reopen App')
                    dispatch(loginUser(res.data))
                    dispatch(carsList())
                    NavigationService.navigate('App', null)
                })
                .catch(error => {
                    console.log('🔴 Login Error! /w Reopen App')
                    console.log(error);
                    AsyncStorage.removeItem("token")
                    NavigationService.navigate('Auth', null)
                })
        } else {
            NavigationService.navigate('Auth', null)
        }
    }
}

export const userList = () => {
    return dispatch => {
        instance.get('/user/list')
            .then(res => {
                console.log('🟢 List User Succesfull!')
                dispatch(listUser(res.data))
            })
            .catch(error => {
                console.log('🔴 List User Error!')
                console.log(error)
            })
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

const listUser = userObj => ({
    type: 'LIST_USER',
    payload: userObj
})

const logoutUser = () => ({
    type: 'LOGOUT_USER'
})

const addUser = user => ({
    type: 'ADD_USER',
    payload: user
})

const updateUser = user => ({
    type: 'UPDATE_USER',
    payload: user
})

const deleteUser = id => ({
    type: 'DELETE_USER',
    payload: id
})