import { connectRouter } from 'connected-react-router/immutable';
import { localizeReducer } from 'react-localize-redux';
import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import auth from './auth';
import collections from './collections';
import content from './content';
import spaces from './spaces';
import users from './users';

export default history =>
  combineReducers({
    form: formReducer,
    localize: localizeReducer,
    router: connectRouter(history),
    auth,
    collections,
    content,
    spaces,
    users,
  });
