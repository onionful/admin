import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import auth from './auth';
import contentTypes from './contentTypes';
import content from './content';
import spaces from './spaces';
import users from './users';

export default combineReducers({
  form: formReducer,
  auth,
  contentTypes,
  content,
  spaces,
  users,
});
