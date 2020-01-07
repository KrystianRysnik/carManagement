const initialState = {
    currentUser: {},
    listUser: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return { ...state, currentUser: action.payload }
        case 'LIST_USER':
            return { ...state, listUser: action.payload }
        case 'LOGOUT_USER':
            return { ...state, currentUser: {} }
        default:
            return state;
    }
}