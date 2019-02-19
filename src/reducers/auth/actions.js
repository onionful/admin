import { Map } from 'immutable';
import { api } from 'utils';
import { getProfile } from './selectors';
import * as types from './types';

export const logout = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const fetchProfile = () => ({
  type: types.PROFILE_GET,
  payload: api.get('/profile'),
});

export const updateProfile = metadata => (dispatch, getState) => {
  const profile = getProfile(getState());
  const current = profile.get('user_metadata', Map());
  const updated = current.merge(metadata);

  const payload = current.equals(updated)
    ? Promise.resolve(profile.toJS())
    : api.put('/profile', updated.toJS()).then(({ data }) => data);

  return dispatch({
    type: types.PROFILE_UPDATE,
    payload,
  });
};
