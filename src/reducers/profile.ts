import profileActions from 'actions/profile';
import { ApplicationState } from 'reducers/index';
import { Profile } from 'types';
import { createReducer } from 'typesafe-actions';

export interface ProfileState {
  profile?: Profile;
}

const initialState: ProfileState = {};

// Selectors
export const getUserId = (state: ApplicationState) =>
  state.profile.profile && state.profile.profile.user_id;

// Reducer
export default createReducer(initialState)
  .handleAction(profileActions.fetch.success, (state, action) => ({
    ...state,
    profile: action.payload,
  }))
  .handleAction(profileActions.fetch.failure, state => state);
