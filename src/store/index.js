import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import { fromJS } from 'immutable';
import reducers from 'reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import sagas from 'sagas';

export const history = createBrowserHistory();

const initialState = fromJS({});
const sagaMiddleware = createSagaMiddleware();
const middlewares = [routerMiddleware(history), promiseMiddleware(), sagaMiddleware];

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
sagaMiddleware.run(sagas);

export default store;
