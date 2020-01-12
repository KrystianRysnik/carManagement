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
        case 'ADD_USER':
            return { ...state, users: state.users.concat(action.payload) }
        case 'UPDATE_USER':
            return { ...state, users: state.users.map(user => user._id === action.payload._id ? action.payload : user) }
        case 'DELETE_USER':
            return { ...state, users: state.users.filter(user => user._id !== action.payload) }
        default:
            return state;
    }
}