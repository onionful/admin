import { localizeReducer } from 'react-localize-redux';
import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import auth from './auth';
import collections from './collections';
import content from './content';
import spaces from './spaces';
import users from './users';

export default combineReducers({
  form: formReducer,
  localize: localizeReducer,
  auth,
  collections,
  content,
  spaces,
  users,
});
