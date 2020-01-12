const initialState = {
    car: {},
    cars: []
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
        default:
            return state;
    }
}