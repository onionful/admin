import { localizeReducer } from 'react-localize-redux';
import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import auth from './auth';
import content from './content';
import contentTypes from './contentTypes';
import spaces from './spaces';
import users from './users';

export default combineReducers({
  form: formReducer,
  localize: localizeReducer,
  auth,
  contentTypes,
  content,
  spaces,
  users,
});
