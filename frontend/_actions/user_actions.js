import axios from 'axios';
import { AsyncStorage } from 'react-native';
import NavigationService from '../NavigationService';


const instance = axios.create({
    baseURL: 'http://192.168.0.19:3000'
});

//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


export const userSignUp = user => {
    return dispatch => {
        instance.post('/user/register', {
            name: user.name,
            email: user.email,
            password: user.password
        })
            .then(res => {
                console.log('🟢 Register Succesfull!')
                AsyncStorage.setItem('token', res.data.token)
                dispatch(loginUser(res.data.user));
                NavigationService.navigate('App', null);
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
                AsyncStorage.setItem('token', res.data.token)
                dispatch(loginUser(res.data.user));
                NavigationService.navigate('App', null);
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
                AsyncStorage.removeItem('token')
                dispatch(logoutUser());
                NavigationService.navigate('Auth', null);
            })
            .catch(error => {
                console.log('🔴 Logout Error!')
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

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

const logoutUser = () => ({
    type: 'LOGOUT_USER'
})