import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App, Authorize, Login } from 'containers';
import configureStore from 'reducers';
import 'normalize.css';
import registerServiceWorker from './registerServiceWorker';
import history from './history';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/auth" component={Authorize} />
        <Route path="/" component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
