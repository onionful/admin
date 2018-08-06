import config from 'config';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { App, Authorize, Login } from 'containers';
import 'normalize.css';
import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import store, { history } from 'store';
import translations from 'translations';
import registerServiceWorker from './registerServiceWorker';

const { defaultLocale } = config;
const locale = defaultLocale; // DEFAULT_LOCALE

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
