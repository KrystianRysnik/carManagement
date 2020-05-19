import AsyncStorage from '@react-native-community/async-storage';
import { carsList } from './car_actions';
import NavigationService from '../NavigationService';
import { instance } from '../settings';

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
                dispatch(setToken(res.data.token))
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
                dispatch(setToken(res.data.token))
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
        instance.post('/user/logout', {},
        {
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then(res => {
                console.log('🟢 Logout Succesfull!')
                AsyncStorage.removeItem('@token')
                dispatch(logoutUser())
                dispatch(removeToken())
                NavigationService.navigate('Auth', null)
            })
            .catch(error => {
                console.log('🔴 Logout Error!')
                console.log(error);
            })
    }
}

export const userProfileUpdate = user => {
    return (dispatch, getState) => {
        instance.put('/user/profile/update', {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        },
        {
            headers: {'Authorization': `Bearer ${getState().user.token}`}
        })
            .then(res => {
                dispatch(loginUser(res.data))
                dispatch(updateUserSuccess())
                console.log('🟢 Update User Succesfull!')
            })
            .catch(error => {
                dispatch(updateUserError())
                console.log('🔴 Update User Error!')
                console.log(error);
            })
    }
}

export const userAdd = user => {
    return (dispatch, getState) => {
        instance.post('/user/add', {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            role: user.role
        },
        {
            headers: {'Authorization': `Bearer ${getState().user.token}`}
        })
            .then(res => {
                dispatch(addUser(res.data))
                dispatch(addUserSuccess())
                console.log('🟢 Add User Succesfull!')
            })
            .catch(error => {
                dispatch(addUserError())
                console.log('🔴 Add User Error!')
                console.log(error);
            })
    }
}


export const userUpdate = user => {
    return (dispatch, getState) => {
        instance.put('/user/update', {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        },
        {
            headers: {'Authorization': `Bearer ${getState().user.token}`}
        })
            .then(res => {
                dispatch(updateUser({
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }))
                dispatch(updateUserSuccess())
                console.log('🟢 Update User Succesfull!')
            })
            .catch(error => {
                dispatch(updateUserError())
                console.log('🔴 Update User Error!')
                console.log(error);
            })
    }
}

export const userDelete = id => {
    return (dispatch, getState) => {
        instance.delete(`/user/delete/${id}`,
        {
            headers: {'Authorization': `Bearer ${getState().user.token}`}
        })
            .then(res => {
                dispatch(deleteUser(id))
                dispatch(deleteUserSuccess())
                console.log('🟢 Delete User Succesfull!')
            })
            .catch(error => {
                dispatch(deleteUserError())
                console.log('🔴 Delete Car Error!')
                console.log(error);
            })
    }
}

export const userProfile = token => {
    return dispatch => {
        if (token) {
            instance.get('/user/profile',
            {
                headers: {'Authorization': `Bearer ${token}`}
            })
                .then(res => {
                    console.log('🟢 Login Succesfull! /w Reopen App')
                    dispatch(loginUser(res.data))
                    dispatch(setToken(token))
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
    return (dispatch, getState) => {
        instance.get('/user/list',
        {
            headers: {'Authorization': `Bearer ${getState().user.token}`}
        })
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

const setToken = token => ({
    type: 'SET_TOKEN',
    payload: token
})

const removeToken = () => ({
    type: 'REMOVE_TOKEN',
})


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

const addUserSuccess = () => ({
    type: 'ADD_USER_SUCCESS'
})

const addUserError = () => ({
    type: 'ADD_USER_ERROR'
})

const updateUserSuccess = () => ({
    type: 'UPDATE_USER_SUCCESS'
})

const updateUserError = () => ({
    type: 'UPDATE_USER_ERROR'
})

const deleteUserSuccess = () => ({
    type: 'DELETE_USER_SUCCESS'
})

const deleteUserError = () => ({
    type: 'DELETE_USER_ERROR'
})