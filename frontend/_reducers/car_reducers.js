const initialState = {
    currentCar: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SELECT_CAR':
            return { ...state, currentCar: action.payload }
        default:
            return state;
    }
}