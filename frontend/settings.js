import axios from 'axios';

export const instance =  axios.create({
    //baseURL: 'http://192.168.0.19:3000',
    baseURL: 'https://car-management-backend.herokuapp.com/',
})