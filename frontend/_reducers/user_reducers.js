const initialState = {
    user: {},
    users: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return { ...state, user: action.payload }
        case 'LOGOUT_USER':
            return { ...state, user: {} }
        case 'LIST_USER':
            return { ...state, users: action.payload }
        default:
            return state;
    }
}