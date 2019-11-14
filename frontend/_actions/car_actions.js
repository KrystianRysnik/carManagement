import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://192.168.0.19:3000'
    baseURL: 'https://car-management-backend.herokuapp.com/'
});

//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const carsList = () => {
    return dispatch => {
        instance.get('/car/list')
            .then(res => {
                console.log('🟢 List Cars Succesfull!')
                dispatch(getAllCars(res.data))
            })
            .catch(error => {
                console.log('🔴 List Cars Error!')
                console.log(error)
            })
    }
}

export const carSelect = car => {
    return dispatch => {
        dispatch(selectCar(car))
    }
}

const getAllCars = carObj => ({
    type: 'GET_ALL_CARS',
    payload: carObj
})

const selectCar = carObj => ({
    type: 'SELECT_CAR',
    payload: carObj
})