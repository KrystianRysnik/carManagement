import {combineReducers} from 'redux';
import user from './user_reducers';
import car from './car_reducers';
import route from './route_reducers';

export default combineReducers({
  user,
  car,
  route,
});
