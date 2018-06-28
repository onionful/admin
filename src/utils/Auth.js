import auth0 from 'auth0-js';
import config from 'config';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: config.auth0.domain,
    clientID: config.auth0.clientId,
    redirectUri: config.auth0.callbackUrl,
    audience: `https://${config.auth0.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  login = () => this.auth0.authorize();

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  };

  handleAuthentication = cb => {
    this.auth0.parseHash((err, authResult) => {
      if (err) {
        cb(err);
      } else if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        cb(null, authResult);
      } else {
        cb(new Error('Unexpected format of authResult'));
      }
    });
  };

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };

  setSession = authResult => {
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  };
}
