import { push } from 'react-router-redux';
import { Auth } from 'utils';
import * as types from './types';

const auth = new Auth();

export const loginRequest = () => ({
  type: types.LOGIN_REQUEST,
});

export const handleLogin = dispatch => () => {
  auth.login();
  dispatch(loginRequest());
};

export const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS,
});

export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  error,
});

export const handleAuthentication = dispatch => (hash) => {
  if (/access_token|id_token|error/.test(hash)) {
    auth.handleAuthentication((err, data) => {
      if (err) {
        dispatch(loginFailure(`${err.error}: ${err.errorDescription}`));
        dispatch(push('/login'));
      } else {
        dispatch(loginSuccess(data));
        dispatch(push('/'));
      }
    });
  }
};

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const handleLogout = dispatch => () => {
  auth.logout();
  dispatch(logoutSuccess());
};

export const profileRequest = () => ({
  type: types.PROFILE_REQUEST,
});


export const profileSuccess = profile => ({
  type: types.PROFILE_SUCCESS,
  profile,
});

export const profileFailure = error => ({
  type: types.PROFILE_FAILURE,
  error,
});

export const handleGetProfile = dispatch => () => {
  dispatch(profileRequest());
  auth.getProfile((err, data) => {
    if (err) {
      dispatch(profileFailure(`${err.error}: ${err.errorDescription}`));
    } else {
      dispatch(profileSuccess(data));
    }
  });
};
