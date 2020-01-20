const initialState = {
    car: {},
    cars: [],
    error: {
        get: false,
        add: false,
        update: false,
        delete: false
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_CARS':
            return { ...state, cars: action.payload }
        case 'ADD_CAR':
            return { ...state, cars: state.cars.concat(action.payload) }
        case 'UPDATE_CAR':
            return { ...state, cars: state.cars.map(car => car._id === action.payload._id ? action.payload : car) }
        case 'DELETE_CAR':
            return { ...state, cars: state.cars.filter(car => car._id !== action.payload) }
        case 'SELECT_CAR':
            return { ...state, car: action.payload }


        case 'GET_CAR_SUCCESS':
            return { ...state, error: Object.assign({}, state.error, { get: false }) }
        case 'GET_CAR_ERROR':
            return { ...state, error: Object.assign({}, state.error, { get: true }) }
        case 'ADD_CAR_SUCCESS':
            return { ...state, error: Object.assign({}, state.error, { add: false }) }
        case 'ADD_cAR_ERROR':
            return { ...state, error: Object.assign({}, state.error, { add: true }) }
        case 'UPDATE_CAR_SUCCESS':
            return { ...state, error: Object.assign({}, state.error, { update: false }) }
        case 'UPDATE_CAR_ERROR':
            return { ...state, error: Object.assign({}, state.error, { update: true }) }
        case 'DELETE_CAR_SUCCESS':
            return { ...state, error: Object.assign({}, state.error, { delete: false }) }
        case 'DELETE_CAR_ERROR':
            return { ...state, error: Object.assign({}, state.error, { delete: true }) }

        default:
            return state;
    }
}