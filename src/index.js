import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { App, Authorize, Login } from 'containers';
import store, { history } from 'store';
import 'normalize.css';
import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/auth" component={Authorize} />
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
