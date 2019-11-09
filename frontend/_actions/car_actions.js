import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://192.168.0.19:3000'
    baseURL: 'https://car-management-backend.herokuapp.com/'
});

//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const carSelect = car => {
    return dispatch => {
        dispatch(selectCar(car))
    }
}

const selectCar = carObj => ({
    type: 'SELECT_CAR',
    payload: carObj
})