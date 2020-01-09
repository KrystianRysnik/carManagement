const initialState = {
    routes: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_ROUTES':
            return { ...state, routes: action.payload }
        default:
            return state;
    }
}