const initialState = {
    cars: [],
    currentCar: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_CARS':
            return { ...state, cars: action.payload }
        case 'SELECT_CAR':
            return { ...state, currentCar: action.payload }
        default:
            return state;
    }
}