/* eslint-disable */
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Authorize, Login } from 'containers';
import App from 'containers/App';
import { injectGlobal } from 'emotion';
import { render } from 'react-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import createStore, { history } from 'store';
import { React } from 'utils/create';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
  body {
    background: #eceef1 url('/stripes.svg')
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
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact component={Login} path="/(auth|login)" />
          <Route component={App} path="/" />
        </Switch>
      </ConnectedRouter>
    </LocalizeProvider>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
