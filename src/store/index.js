import { createBrowserHistory } from 'history';
import { fromJS } from 'immutable';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from 'reducers';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

const initialState = fromJS({});
const middlewares = [thunk, routerMiddleware(history), promiseMiddleware()];

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

const store = createStore(connectRouter(history)(reducers), initialState, composedEnhancers);

export default store;
