import { push } from 'connected-react-router';
import { getProfile } from 'reducers/auth/index';
import { api, Auth } from 'utils';
import * as types from './types';

const auth = new Auth();

const loginRequest = () => ({
  type: types.LOGIN_REQUEST,
});

const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS,
});

const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  error,
});

export const login = dispatch => () => {
  dispatch(loginRequest());
  auth.login();
};

export const handleAuthentication = dispatch => hash => {
  if (/access_token|id_token|error/.test(hash)) {
    auth.handleAuthentication((err, data) => {
      if (err) {
        dispatch(loginFailure(`${err.error}: ${err.errorDescription}`));
        dispatch(push('/handleLogin'));
      } else {
        dispatch(loginSuccess(data));
        dispatch(push('/'));
      }
    });
  }
};

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const logout = dispatch => () => {
  auth.handleLogout();
  dispatch(logoutSuccess());
};

export const fetchProfile = () => ({
  type: types.PROFILE_GET,
  payload: api.get('/profile'),
});

export const updateProfile = metadata => (dispatch, getState) => {
  const profile = getProfile(getState());
  const current = profile.get('user_metadata');
  const updated = current.merge(metadata);

  const payload = current.equals(updated)
    ? Promise.resolve(profile.toJS())
    : api.put('/profile', updated.toJS()).then(({ data }) => data);

  return dispatch({
    type: types.PROFILE_UPDATE,
    payload,
  });
};
