export { default as types } from './types';

export default {
  auth0: {
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
    callbackUrl: process.env.REACT_APP_AUTH0_CALLBACKURL,
    claimDomain: 'https://onionful.com/',
  },
  api: {
    endpoint: process.env.REACT_APP_API_ENDPOINT,
  },
  defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE,
};
