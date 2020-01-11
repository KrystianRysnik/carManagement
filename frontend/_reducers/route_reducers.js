const initialState = {
    route: {},
    routes: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ROUTE':
            return { ...state, route: action.payload }
        case 'GET_ALL_ROUTES':
            return { ...state, routes: action.payload }
        case 'DELETE_ROUTE':
            return { ...state, routes: state.routes.filter(route => route._id !== action.payload) }
        default:
            return state;
    }
}