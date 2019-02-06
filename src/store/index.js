import { routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import { fromJS } from 'immutable';
import { addTranslationForLanguage, initialize } from 'react-localize-redux';
import reducers from 'reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import sagas from 'sagas';
import translations from 'translations';

export const history = createBrowserHistory();

export default () => {
  const initialState = fromJS({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [thunk, routerMiddleware(history), promiseMiddleware, sagaMiddleware];

  const enhancers = [];
  if (process.env.NODE_ENV === 'development') {
    const { __REDUX_DEVTOOLS_EXTENSION__ } = window;

    if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
      enhancers.push(__REDUX_DEVTOOLS_EXTENSION__());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers,
  );

  const store = createStore(reducers(history), initialState, composedEnhancers);
  sagaMiddleware.run(sagas, store.getState);

  store.dispatch(initialize(translations));
  translations.languages.map(({ code, data }) =>
    store.dispatch(addTranslationForLanguage(data, code)),
  );

  return store;
};
