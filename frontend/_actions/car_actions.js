import { instance } from '../settings';

export const carsList = () => {
    return (dispatch, getState) => {
        instance.get('/car/list',
        {
            headers: {'Authorization': `Bearer ${getState().user.token}`}
        })
            .then(res => {
                console.log('🟢 List Cars Succesfull!')
                dispatch(getAllCars(res.data))
                dispatch(getCarSuccess())
            })
            .catch(error => {
                dispatch(getCarError())
                console.log('🔴 List Cars Error!')
                console.log(error)
            })
    }
}

export const carAdd = car => {
    return (dispatch, getState) => {
        instance.post('/car/add', {
            name: car.name,
            vin: car.vin,
            mileage: car.mileage,
            licensePlate: car.licensePlate,
            engineSize: car.engineSize
        },
        {
            headers: {'Authorization': `Bearer ${getState().user.token}`}
        })
            .then(res => {
                dispatch(addCar(res.data.car))
                dispatch(addCarSuccess())
                console.log('🟢 Add Car Succesfull!')
            })
            .catch(error => {
                dispatch(addCarError())
                console.log('🔴 Add Car Error!')
                console.log(error);
            })
    }
}

export const carUpdate = car => {
    return (dispatch, getState) => {
        instance.put('/car/update', {
            _id: car._id,
            name: car.name,
            vin: car.vin,
            mileage: car.mileage,
            licensePlate: car.licensePlate,
            engineSize: car.engineSize
        },
        {
            headers: {'Authorization': `Bearer ${getState().user.token}`}
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
                dispatch(updateCarSuccess())
                console.log('🟢 Update Car Succesfull!')
            })
            .catch(error => {
                dispatch(updateCarError())
                console.log('🔴 Update Car Error!')
                console.log(error);
            })
    }
}

export const carDelete = id => {
    return (dispatch, getState) => {
        instance.delete(`/car/delete/${id}`,
        {
            headers: {'Authorization': `Bearer ${getState().user.token}`}
        })
            .then(res => {
                dispatch(deleteCar(id))
                dispatch(deleteCarSuccess())
                console.log('🟢 Delete Car Succesfull!')
            })
            .catch(error => {
                dispatch(deleteCarError())
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

// Handle errors
const getCarSuccess = () => ({
    type: 'GET_CAR_SUCCESS'
})

const getCarError = () => ({
    type: 'GET_CAR_ERROR'
})

const addCarSuccess = () => ({
    type: 'ADD_CAR_SUCCESS'
})

const addCarError = () => ({
    type: 'ADD_cAR_ERROR'
})

const updateCarSuccess = () => ({
    type: 'UPDATE_CAR_SUCCESS'
})

const updateCarError = () => ({
    type: 'UPDATE_CAR_ERROR'
})

const deleteCarSuccess = () => ({
    type: 'DELETE_CAR_SUCCESS'
})

const deleteCarError = () => ({
    type: 'DELETE_CAR_ERROR'
})