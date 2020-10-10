import moment from 'moment';
import instance from '../settings';

export const routeAdd = (route, user, vin) => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.post(
        '/route/add',
        {
          carVin: vin,
          startTrace: route.startTrace,
          stopTrace: route.stopTrace,
          distance: route.distance,
          purpose: route.purpose,
          driver: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          markers: route.markers,
        },
        {
          headers: {Authorization: `Bearer ${getState().user.token}`},
        }
      );
      const data = await response.data;
      data.markers = undefined;
      dispatch(addRoute(data));
      dispatch(addRouteSuccess());
    } catch (err) {
      dispatch(addRouteError());
      console.log(err);
    }
  };
};

export const routeGet = (id, withMarkers) => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.get(`/route/${id}/${withMarkers}`, {
        headers: {Authorization: `Bearer ${getState().user.token}`},
      });
      const data = await response.data;
      dispatch(getRoute(data));
      dispatch(getRouteSuccess());
    } catch (err) {
      dispatch(getRouteError());
      console.log(err);
    }
  };
};

export const routeDelete = (id) => {
  return async (dispatch, getState) => {
    try {
      await instance.delete(`/route/delete/${id}`, {
        headers: {Authorization: `Bearer ${getState().user.token}`},
      });
      dispatch(deleteRoute(id));
      dispatch(deleteRouteSuccess());
    } catch (err) {
      dispatch(deleteRouteError());
      console.log(err);
    }
  };
};

export const routeUpdate = (route) => {
  return async (dispatch, getState) => {
    try {
      await instance.put(
        '/route/update',
        {
          _id: route._id,
          carVin: route.carVin,
          startTrace: route.startTrace,
          stopTrace: route.stopTrace,
          distance: route.distance,
          purpose: route.purpose,
          driver: {
            email: route.driverEmail,
            firstName: route.driverFirstName,
            lastName: route.driverLastName,
          },
        },
        {
          headers: {Authorization: `Bearer ${getState().user.token}`},
        }
      );
      dispatch(
        updateRoute({
          _id: route._id,
          carVin: route.carVin,
          startTrace: moment(route.startTrace).toJSON(),
          stopTrace: moment(route.stopTrace).toJSON(),
          distance: parseFloat(route.distance),
          purpose: route.purpose,
          driver: {
            email: route.driverEmail,
            firstName: route.driverFirstName,
            lastName: route.driverLastName,
          },
        })
      );
      dispatch(updateRouteSuccess());
    } catch (err) {
      dispatch(updateRouteError());
      console.log(err);
    }
  };
};

export const routeList = () => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.get('/route/list', {
        headers: {Authorization: `Bearer ${getState().user.token}`},
      });
      const data = await response.data;
      dispatch(getAllRoutes(data));
      dispatch(getAllRouteSuccess());
    } catch (err) {
      dispatch(getAllRouteError());
      console.log(err);
    }
  };
};

const addRoute = (route) => ({
  type: 'ADD_ROUTE',
  payload: route,
});

const getRoute = (route) => ({
  type: 'GET_ROUTE',
  payload: route,
});

const getAllRoutes = (routes) => ({
  type: 'GET_ALL_ROUTES',
  payload: routes,
});

const updateRoute = (route) => ({
  type: 'UPDATE_ROUTE',
  payload: route,
});

const deleteRoute = (route) => ({
  type: 'DELETE_ROUTE',
  payload: route,
});

const addRouteSuccess = () => ({
  type: 'ADD_ROUTE_SUCCESS',
});

const addRouteError = () => ({
  type: 'ADD_ROUTE_ERROR',
});

const getRouteSuccess = () => ({
  type: 'GET_ROUTE_SUCCESS',
});

const getRouteError = () => ({
  type: 'GET_ROUTE_ERROR',
});

const getAllRouteSuccess = () => ({
  type: 'GET_ALL_ROUTE_SUCCESS',
});

const getAllRouteError = () => ({
  type: 'GET_ALL_ROUTE_ERROR',
});

const updateRouteSuccess = () => ({
  type: 'UPDATE_ROUTE_SUCCESS',
});

const updateRouteError = () => ({
  type: 'UPDATE_ROUTE_ERROR',
});

const deleteRouteSuccess = () => ({
  type: 'DELETE_ROUTE_SUCCESS',
});

const deleteRouteError = () => ({
  type: 'DELETE_ROUTE_ERROR',
});
