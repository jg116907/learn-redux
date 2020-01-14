import { combineReducers } from 'redux';
import counter from './counter';
import waiting from './waiting';

// root reducer
export default combineReducers({
  counter,
  waiting,
})