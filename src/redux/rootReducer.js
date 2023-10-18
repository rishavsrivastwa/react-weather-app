// rootReducer.js
import { combineReducers } from 'redux';
import weatherReducer from './weatherSlice';
import locationsReducer from './locationSlice';
import errorReducer from './errorSlice';

const rootReducer = combineReducers({
  weather: weatherReducer,
  locations: locationsReducer,
  error: errorReducer,
});

export default rootReducer;
