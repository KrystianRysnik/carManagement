const initialState = {
  route: {},
  routes: [],
  error: {
    add: false,
    get: false,
    getAll: false,
    update: false,
    delete: false,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ROUTE':
      return {...state, routes: state.routes.concat(action.payload)};
    case 'GET_ROUTE':
      return {...state, route: action.payload};
    case 'GET_ALL_ROUTES':
      return {...state, routes: action.payload};
    case 'UPDATE_ROUTE':
      return {
        ...state,
        routes: state.routes.map((route) =>
          route._id === state.route._id ? action.payload : route
        ),
      };
    case 'DELETE_ROUTE':
      return {
        ...state,
        routes: state.routes.filter((route) => route._id !== action.payload),
      };

    case 'ADD_ROUTE_SUCCESS':
      return {...state, error: {...state.error, add: false}};
    case 'ADD_ROUTE_ERROR':
      return {...state, error: {...state.error, add: true}};
    case 'GET_ROUTE_SUCCESS':
      return {...state, error: {...state.error, get: false}};
    case 'GET_ROUTE_ERROR':
      return {...state, error: {...state.error, get: true}};
    case 'GET_ALL_ROUTE_SUCCESS':
      return {...state, error: {...state.error, getAll: false}};
    case 'GET_ALL_ROUTE_ERROR':
      return {...state, error: {...state.error, getAll: true}};
    case 'UPDATE_ROUTE_SUCCESS':
      return {...state, error: {...state.error, update: false}};
    case 'UPDATE_ROUTE_ERROR':
      return {...state, error: {...state.error, update: true}};
    case 'DELETE_ROUTE_SUCCESS':
      return {...state, error: {...state.error, delete: false}};
    case 'DELETE_ROUTE_ERROR':
      return {...state, error: {...state.error, delete: true}};

    default:
      return state;
  }
}
