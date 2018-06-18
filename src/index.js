import 'normalize.css';
import React from 'react';
import { App, Authorize, Login } from 'containers';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { IntlProvider } from 'react-intl';
import store, { history } from 'store';
import translations from 'translations';
import registerServiceWorker from './registerServiceWorker';

const locale = 'en';

render(
  <Provider store={store}>
    <IntlProvider locale={locale} messages={translations[locale]}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/auth" component={Authorize} />
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
