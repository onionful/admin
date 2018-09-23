import { ConnectedRouter } from 'connected-react-router/immutable';
import { Authorize, Login } from 'containers';
import App from 'containers/App';
import 'glamor/reset';
import React from 'react';
import { render } from 'react-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import createStore, { history } from 'store';
import registerServiceWorker from './registerServiceWorker';

const store = createStore();

render(
  <Provider store={store}>
    <LocalizeProvider>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/auth" component={Authorize} />
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </LocalizeProvider>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
