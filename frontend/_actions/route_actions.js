import axios from 'axios';
import moment from 'moment';

const instance = axios.create({
    //baseURL: 'http://192.168.0.19:3000'
    baseURL: 'https://car-management-backend.herokuapp.com/'
});

export const routeAdd = (data, user, vin) => {
    return (dispatch, getState) => {
        instance.post('/route/add', {
            carVin: vin,
            startTrace: data.startTrace,
            stopTrace: data.stopTrace,
            distance: data.distance,
            purpose: data.purpose,
            driver: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            markers: data.markers
        },
            {
                headers: { 'Authorization': `Bearer ${getState().user.token}` }
            })
            .then(res => {
                dispatch(addRouteSuccess())
                let data = res.data
                data.markers = undefined
                dispatch(addRoute(data))
                console.log('🟢 Add Route Succesfull!')
            })
            .catch(error => {
                dispatch(addRouteError())
                console.log('🔴 Add Route Error!')
                console.log(error)
            })
    }
}

export const routeGet = (id, withMarkers) => {
    console.log(`/route/${id}/${withMarkers}`)
    return (dispatch, getState) => {
        instance.get(`/route/${id}/${withMarkers}`,
            {
                headers: { 'Authorization': `Bearer ${getState().user.token}` }
            })
            .then(res => {
                dispatch(getRoute(res.data))
                dispatch(getRouteSuccess())
                console.log('🟢 Get Route Succesfull!')
            })
            .catch(error => {
                dispatch(getRouteSuccess())
                console.log('🔴 Get Route Error!')
                console.log(error)
            })
    }
}

export const routeDelete = id => {
    return (dispatch, getState) => {
        instance.delete(`/route/delete/${id}`,
            {
                headers: { 'Authorization': `Bearer ${getState().user.token}` }
            })
            .then(res => {
                dispatch(deleteRoute(id))
                dispatch(deleteRouteSuccess())
                console.log('🟢 Delete Route Succesfull!')
            })
            .catch(error => {
                dispatch(deleteRouteError())
                console.log('🔴 Delete Route Error!')
                console.log(error)
            })
    }
}

export const routeUpdate = route => {
    return (dispatch, getState) => {
        instance.put('/route/update', {
            _id: route._id,
            carVin: route.carVin,
            startTrace: route.startTrace,
            stopTrace: route.stopTrace,
            distance: route.distance,
            purpose: route.purpose,
            driver: {
                email: route.driverEmail,
                firstName: route.driverFirstName,
                lastName: route.driverLastName
            }
        },
            {
                headers: { 'Authorization': `Bearer ${getState().user.token}` }
            })
            .then(res => {
                console.log('🟢 Update Route Succesfull!')
                dispatch(updateRoute({
                    _id: route._id,
                    carVin: route.carVin,
                    startTrace: moment(route.startTrace).toJSON(),
                    stopTrace: moment(route.stopTrace).toJSON(),
                    distance: parseFloat(route.distance),
                    purpose: route.purpose,
                    driver: {
                        email: route.driverEmail,
                        firstName: route.driverFirstName,
                        lastName: route.driverLastName
                    }
                }))
                dispatch(updateRouteSuccess())
            })
            .catch(error => {
                dispatch(updateRouteError())
                console.log('🔴 Update Route Error!')
                console.log(error);
            })
    }
}

export const routeList = () => {
    return (dispatch, getState) => {
        instance.get('/route/list',
            {
                headers: { 'Authorization': `Bearer ${getState().user.token}` }
            })
            .then(res => {
                dispatch(getAllRoutes(res.data))
                dispatch(getAllRouteSuccess())
                console.log('🟢 List Routes Succesfull!')
            })
            .catch(error => {
                dispatch(getAllRouteError())
                console.log('🔴 List Routes Error!')
                console.log(error)
            })
    }
}

const addRoute = route => ({
    type: 'ADD_ROUTE',
    payload: route
})

const getRoute = route => ({
    type: 'GET_ROUTE',
    payload: route
})

const getAllRoutes = routes => ({
    type: 'GET_ALL_ROUTES',
    payload: routes
})

const updateRoute = route => ({
    type: 'UPDATE_ROUTE',
    payload: route
})

const deleteRoute = route => ({
    type: 'DELETE_ROUTE',
    payload: route
})

const addRouteSuccess = () => ({
    type: 'ADD_ROUTE_SUCCESS'
})

const addRouteError = () => ({
    type: 'ADD_ROUTE_ERROR'
})

const getRouteSuccess = () => ({
    type: 'GET_ROUTE_SUCCESS'
})

const getRouteError = () => ({
    type: 'GET_ROUTE_ERROR'
})

const getAllRouteSuccess = () => ({
    type: 'GET_ALL_ROUTE_SUCCESS'
})

const getAllRouteError = () => ({
    type: 'GET_ALL_ROUTE_ERROR'
})

const updateRouteSuccess = () => ({
    type: 'UPDATE_ROUTE_SUCCESS'
})

const updateRouteError = () => ({
    type: 'UPDATE_ROUTE_ERROR'
})

const deleteRouteSuccess = () => ({
    type: 'DELETE_ROUTE_SUCCESS'
})

const deleteRouteError = () => ({
    type: 'DELETE_ROUTE_ERROR'
})

