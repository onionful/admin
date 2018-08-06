import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import { fromJS } from 'immutable';
import reducers from 'reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import sagas from 'sagas';
import { addTranslationForLanguage, initialize } from 'react-localize-redux';
import translations from 'translations';

export const history = createBrowserHistory();

export default () => {
  const initialState = fromJS({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [thunk, routerMiddleware(history), promiseMiddleware(), sagaMiddleware];

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
  sagaMiddleware.run(sagas, store.getState);

  store.dispatch(initialize(translations));
  translations.languages.map(({ code, data }) =>
    store.dispatch(addTranslationForLanguage(data, code)),
  );

  return store;
};
