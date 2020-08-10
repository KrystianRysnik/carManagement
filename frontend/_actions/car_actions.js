import {instance} from '../settings';

export const carsList = () => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.get('/car/list', {
        headers: {Authorization: `Bearer ${getState().user.token}`},
      });
      const data = await response.data;
      dispatch(getAllCars(data));
      dispatch(getCarSuccess());
      console.log('🟢 List Cars Succesfull!');
    } catch (err) {
      dispatch(getCarError());
      console.log('🔴 List Cars Error!');
      console.log(err);
    }
  };
};

export const carAdd = (car) => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.post(
        '/car/add',
        {
          name: car.name,
          vin: car.vin,
          mileage: car.mileage,
          licensePlate: car.licensePlate,
          engineSize: car.engineSize,
        },
        {
          headers: {Authorization: `Bearer ${getState().user.token}`},
        }
      );
      const data = await response.data;
      dispatch(addCar(data.car));
      dispatch(addCarSuccess());
      console.log('🟢 Add Car Succesfull!');
    } catch (err) {
      dispatch(addCarError());
      console.log('🔴 Add Car Error!');
      console.log(error);
    }
  };
};

export const carUpdate = (car) => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.put(
        '/car/update',
        {
          _id: car._id,
          name: car.name,
          vin: car.vin,
          mileage: car.mileage,
          licensePlate: car.licensePlate,
          engineSize: car.engineSize,
        },
        {
          headers: {Authorization: `Bearer ${getState().user.token}`},
        }
      );
      dispatch(
        updateCar({
          _id: car._id,
          name: car.name,
          vin: car.vin,
          mileage: parseInt(car.mileage),
          licensePlate: car.licensePlate,
          engineSize: parseInt(car.engineSize),
        })
      );
      dispatch(updateCarSuccess());
      console.log('🟢 Update Car Succesfull!');
    } catch (err) {
      dispatch(updateCarError());
      console.log('🔴 Update Car Error!');
      console.log(err);
    }
  };
};

export const carDelete = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.delete(`/car/delete/${id}`, {
        headers: {Authorization: `Bearer ${getState().user.token}`},
      });
      dispatch(deleteCar(id));
      dispatch(deleteCarSuccess());
      console.log('🟢 Delete Car Succesfull!');
    } catch (err) {
      dispatch(deleteCarError());
      console.log('🔴 Delete Car Error!');
      console.log(err);
    }
  };
};

export const carSelect = (car) => {
  return (dispatch) => {
    dispatch(selectCar(car));
  };
};

const getAllCars = (carObj) => ({
  type: 'GET_ALL_CARS',
  payload: carObj,
});

const selectCar = (carObj) => ({
  type: 'SELECT_CAR',
  payload: carObj,
});

const addCar = (car) => ({
  type: 'ADD_CAR',
  payload: car,
});

const deleteCar = (id) => ({
  type: 'DELETE_CAR',
  payload: id,
});

const updateCar = (car) => ({
  type: 'UPDATE_CAR',
  payload: car,
});

// Handle errors
const getCarSuccess = () => ({
  type: 'GET_CAR_SUCCESS',
});

const getCarError = () => ({
  type: 'GET_CAR_ERROR',
});

const addCarSuccess = () => ({
  type: 'ADD_CAR_SUCCESS',
});

const addCarError = () => ({
  type: 'ADD_cAR_ERROR',
});

const updateCarSuccess = () => ({
  type: 'UPDATE_CAR_SUCCESS',
});

const updateCarError = () => ({
  type: 'UPDATE_CAR_ERROR',
});

const deleteCarSuccess = () => ({
  type: 'DELETE_CAR_SUCCESS',
});

const deleteCarError = () => ({
  type: 'DELETE_CAR_ERROR',
});
