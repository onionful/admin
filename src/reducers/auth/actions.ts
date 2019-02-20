import { isEqual, merge } from 'lodash';
import { ApplicationState } from 'reducers';
import { Dispatch } from 'redux';
import { api } from 'utils';
import { getProfile } from './selectors';
import { AuthActionTypes, ProfileUpdatePayload } from './types';

export const logout = () => ({
  type: AuthActionTypes.LOGOUT_SUCCESS,
});

export const fetchProfile = () => ({
  type: AuthActionTypes.PROFILE_GET,
  payload: api.get('/profile'),
});

export const updateProfile = (metadata: ProfileUpdatePayload) => (
  dispatch: Dispatch,
  getState: () => ApplicationState,
) => {
  const profile = getProfile(getState());
  if (!profile) {
    throw new Error('Profile is not available');
  }

  const current = profile.user_metadata;
  const updated = merge(current, metadata);

  const payload = isEqual(current, updated)
    ? Promise.resolve(profile)
    : api.put('/profile', updated).then(({ data }) => data);

  return dispatch({
    type: AuthActionTypes.PROFILE_UPDATE,
    payload,
  });
};
