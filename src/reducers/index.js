import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import auth from './auth';
import content from './content';
import spaces from './spaces';
import users from './users';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  auth,
  content,
  spaces,
  users,
});
