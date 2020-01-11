import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://192.168.0.19:3000'
    baseURL: 'https://car-management-backend.herokuapp.com/'
});

export const routeGet = id => {
    return dispatch => {
        instance.get(`/route/id/${id}`)
        .then(res => {
            console.log('🟢 Get Route Succesfull!')
            dispatch(getRoute(res.data))
        })
        .catch (error => {
            console.log('🔴 Get Route Error!')
            console.log(error)
        })
    }
}

export const routeDelete = id => {
    return dispatch => {
        instance.delete(`/route/delete/${id}`)
            .then(res => {
                console.log('🟢 Delete Route Succesfull!')
                dispatch(deleteRoute(id))
            })
            .catch(error => {
                console.log('🔴 Delete Route Error!')
                console.log(error)
            })
    }
}

export const routeUpdate = route => {
    return dispatch => {
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
        })
            .then(res => {
                console.log('🟢 Update Route Succesfull!')
                // dispatch()
            })
            .catch(error => {
                console.log('🔴 Update Route Error!')
                console.log(error);
            })
    }
}

export const routeList = () => {
    return dispatch => {
        instance.get('/route/list')
            .then(res => {
                console.log('🟢 List Routes Succesfull!')
                dispatch(getAllRoutes(res.data))
            })
            .catch(error => {
                console.log('🔴 List Routes Error!')
                console.log(error)
            })
    }
}

const getRoute = route => ({
    type: 'GET_ROUTE',
    payload: route
})

const getAllRoutes = routes => ({
    type: 'GET_ALL_ROUTES',
    payload: routes
})

const deleteRoute = route => ({
    type: 'DELETE_ROUTE',
    payload: route
})