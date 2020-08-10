const initialState = {
  token: '',
  user: {},
  users: [],
  error: {
    add: false,
    update: false,
    delete: false,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {...state, token: action.payload};
    case 'REMOVE_TOKEN':
      return {...state, token: ''};

    case 'LOGIN_USER':
      return {...state, user: action.payload};
    case 'LOGOUT_USER':
      return {...state, user: {}};
    case 'LIST_USER':
      return {...state, users: action.payload};
    case 'ADD_USER':
      return {...state, users: state.users.concat(action.payload)};
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case 'ADD_USER_SUCCESS':
      return {...state, error: {...state.error, add: false}};
    case 'ADD_USER_ERROR':
      return {...state, error: {...state.error, add: true}};
    case 'UPDATE_USER_SUCCESS':
      return {...state, error: {...state.error, update: false}};
    case 'UPDATE_USER_ERROR':
      return {...state, error: {...state.error, update: true}};
    case 'DELETE_USER_SUCCESS':
      return {...state, error: {...state.error, delete: false}};
    case 'DELETE_ADD_USER_ERROR':
      return {...state, error: {...state.error, delete: true}};

    default:
      return state;
  }
}
