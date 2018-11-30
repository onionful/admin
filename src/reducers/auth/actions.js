import { push } from 'connected-react-router';
import { getProfile } from 'reducers/auth/index';
import { api, Auth } from 'utils';
import * as types from './types';

const auth = new Auth();

export const login = () => ({
  type: types.LOGIN_PENDING,
});

export const authenticate = hash => dispatch => {
  const fail = error => {
    dispatch({
      type: types.LOGIN_REJECTED,
      error,
    });
    dispatch(push('/handleLogin'));
  };

  if (!/access_token|id_token|error/.test(hash)) {
    return fail('access_token is not valid');
  }

  return auth
    .handleAuthentication()
    .then(response => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: response,
      });
      dispatch(push('/'));
    })
    .catch(fail);
};

export const logout = () => ({
  type: types.LOGOUT_SUCCESS,
});

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
