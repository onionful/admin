import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import reducers from 'reducers';

export const history = createBrowserHistory();

const initialState = fromJS({});
const middlewares = [
  thunk,
  routerMiddleware(history),
  promiseMiddleware(),
];

const enhancers = [];
if (process.env.NODE_ENV === 'development') {
  if (typeof window.devToolsExtension === 'function') {
    enhancers.push(window.devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers,
);

const store = createStore(
  reducers,
  initialState,
  composedEnhancers,
);

export default store;
