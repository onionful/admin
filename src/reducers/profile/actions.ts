import { Profile } from 'types';
import { createAsyncAction } from 'typesafe-actions';

const fetchProfileAction = createAsyncAction(
  'PROFILE_FETCH_PENDING',
  'PROFILE_FETCH_FULFILLED',
  'PROFILE_FETCH_REJECTED',
)<undefined, Profile, any>();

export default {
  fetchProfileAction,
};
