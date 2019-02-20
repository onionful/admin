import auth0, { Auth0DecodedHash } from 'auth0-js';
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

  authenticate = () =>
    new Promise((resolve, reject) =>
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          reject(err);
        } else if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve(authResult);
        } else {
          reject(new Error('Unexpected format of authResult'));
        }
      }),
    );

  isAuthenticated = () => new Date().getTime() < +(localStorage.getItem('expires_at') || 0);

  login = () => this.auth0.authorize();

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  };

  setSession = (authResult: Auth0DecodedHash) => {
    const expiresAt = +(authResult.expiresIn || 0) * 1000 + new Date().getTime();
    localStorage.setItem('access_token', authResult.accessToken || '');
    localStorage.setItem('id_token', authResult.idToken || '');
    localStorage.setItem('expires_at', expiresAt.toString());
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  };
}
