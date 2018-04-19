import { compose, createStore, combineReducers } from 'redux';
import authReducer from 'reducers/auth';

export default preloadedState => createStore(
  combineReducers({
    auth: authReducer,
  }),
  preloadedState,
  compose(window.devToolsExtension ? window.devToolsExtension() : f => f),
);
