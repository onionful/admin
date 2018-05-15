export default {
  auth0: {
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    callbackUrl: process.env.REACT_APP_AUTH0_CALLBACKURL,
  },
  api: {
    endpoint: process.env.REACT_APP_API_ENDPOINT,
  },
};
