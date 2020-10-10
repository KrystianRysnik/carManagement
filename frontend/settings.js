import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://192.168.0.19:3000',
  baseURL: 'https://car-management-backend.herokuapp.com/',
});

export default instance;
