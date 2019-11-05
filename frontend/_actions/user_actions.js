import axios from 'axios';
import { AsyncStorage } from 'react-native';
import NavigationService from '../NavigationService';

export const userSignUp = user => {
    return dispatch => {
        axios.post('http://192.168.0.19:3000/user/register', {
            name: user.name,
            email: user.email,
            password: user.password
        })
            .then(res => {
                console.log('🟢 Register Succesfull!')
                console.log(res.data.user);
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
        axios.post('http://192.168.0.19:3000/user/login', {
            email: user.email,
            password: user.password
        })
            .then(res => {
                console.log('🟢 Login Succesfull! /w Login Form')
                console.log(res.data.user);
                console.log( res.data.token);
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

export const getProfileFetch = token => {
    return dispatch => {
        if (token) {
            console.log(token)
            axios.get('http://192.168.0.19:3000/user/profile', {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
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