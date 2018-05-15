import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import auth from './auth';
import users from './users';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  auth,
  users,
});
