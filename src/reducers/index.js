import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import auth from './auth';
import spaces from './spaces';
import users from './users';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  auth,
  spaces,
  users,
});
