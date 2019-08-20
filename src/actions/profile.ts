import { Dispatch } from 'redux';
import { Profile } from 'types';
import { createAsyncAction } from 'typesafe-actions';
import { api } from 'utils';

const fetchProfileAction = createAsyncAction(
  'PROFILE_FETCH_PENDING',
  'PROFILE_FETCH_FULFILLED',
  'PROFILE_FETCH_REJECTED',
)<undefined, Profile, any>();

const updateProfileAction = createAsyncAction(
  'PROFILE_UPDATE_PENDING',
  'PROFILE_UPDATE_FULFILLED',
  'PROFILE_UPDATE_REJECTED',
)<Partial<Profile>, Profile, any>();

export default {
  fetch: fetchProfileAction,
  update: updateProfileAction,
};

export const fetchProfile = () => (dispatch: Dispatch) => {
  dispatch(fetchProfileAction.request());

  api
    .get<Profile>('/profile')
    .then(response => dispatch(fetchProfileAction.success(response.data)))
    .catch(error => dispatch(fetchProfileAction.failure(error)));
};
