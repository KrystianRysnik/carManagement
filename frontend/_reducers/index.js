import { combineReducers } from 'redux';
import user from './user_reducers';
import car from './car_reducers';

export default combineReducers({
    user, car
});