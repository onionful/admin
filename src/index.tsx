import { Global } from '@emotion/core';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Login } from 'containers';
import App from 'containers/App';
import React from 'react';
import { render } from 'react-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import createStore, { history } from 'store';
import 'translations/i18n';
import { css } from 'utils/create';
import * as serviceWorker from './serviceWorker';

const globalStyles = css`
  body {
    background: #eceef1 url('/stripes.svg');
  }

  #root {
    min-height: 100%;
    display: flex;
  }
`;

const store = createStore();

render(
  <Provider store={store}>
    <LocalizeProvider>
      <Global styles={globalStyles} />
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact component={Login} path="/(auth|login)" />
          <Route component={App} />
        </Switch>
      </ConnectedRouter>
    </LocalizeProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
