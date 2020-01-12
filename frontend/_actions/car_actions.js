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

export const carAdd = car => {
    return dispatch => {
        instance.post('/car/add', {
            name: car.name,
            vin: car.vin,
            mileage: car.mileage,
            licensePlate: car.licensePlate,
            engineSize: car.engineSize
        })
            .then(res => {
                dispatch(addCar(res.data.car))
                console.log('🟢 Add Car Succesfull!')
            })
            .catch(error => {
                console.log('🔴 Add Car Error!')
                console.log(error);
            })
    }
}

export const carUpdate = car => {
    return dispatch => {
        instance.put('/car/update', {
            _id: car._id,
            name: car.name,
            vin: car.vin,
            mileage: car.mileage,
            licensePlate: car.licensePlate,
            engineSize: car.engineSize
        })
            .then(res => {
                dispatch(updateCar({
                    _id: car._id,
                    name: car.name,
                    vin: car.vin,
                    mileage: parseInt(car.mileage),
                    licensePlate: car.licensePlate,
                    engineSize: parseInt(car.engineSize)
                }))
                console.log('🟢 Update Car Succesfull!')
            })
            .catch(error => {
                console.log('🔴 Update Car Error!')
                console.log(error);
            })
    }
}

export const carDelete = id => {
    return dispatch => {
        instance.delete(`/car/delete/${id}`)
            .then(res => {
                dispatch(deleteCar(id))
                console.log('🟢 Delete Car Succesfull!')
            })
            .catch(error => {
                console.log('🔴 Delete Car Error!')
                console.log(error);
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

const addCar = car => ({
    type: 'ADD_CAR',
    payload: car
})

const deleteCar = id => ({
    type: 'DELETE_CAR',
    payload: id
})

const updateCar = car => ({
    type: 'UPDATE_CAR',
    payload: car
})