import { createBrowserHistory } from 'history';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import reducers from 'reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
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

const composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers);

const store = createStore(reducers, initialState, composedEnhancers);

export default store;
