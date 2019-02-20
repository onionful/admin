import { routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import { addTranslationForLanguage, initialize } from 'react-localize-redux';
import reducers from 'reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import sagas from 'sagas';
import translations, { Language } from 'translations';

export const history = createBrowserHistory();

export default () => {
  const initialState = {};
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [thunk, routerMiddleware(history), promiseMiddleware, sagaMiddleware];

  const enhancers = [];
  if (process.env.NODE_ENV === 'development') {
    const { __REDUX_DEVTOOLS_EXTENSION__ } = window as any;

    if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
      enhancers.push(__REDUX_DEVTOOLS_EXTENSION__());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers,
  );

  const store = createStore(reducers(history), initialState, composedEnhancers);
  sagaMiddleware.run(sagas);

  store.dispatch(initialize(translations));
  translations.languages.forEach(({ code, data }: Language) => {
    store.dispatch(addTranslationForLanguage(data, code));
  });

  return store;
};
