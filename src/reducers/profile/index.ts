import { ApplicationState } from 'reducers/index';
import { Dispatch } from 'redux';
import { Profile } from 'types';
import { createReducer } from 'typesafe-actions';
import { api } from 'utils';
import actions from './actions';

const { fetchProfileAction } = actions;

export interface ProfileState {
  profile?: Profile;
}

const initialState: ProfileState = {};

// Effects
export const fetchProfile = () => (dispatch: Dispatch) => {
  dispatch(fetchProfileAction.request());

  api
    .get<Profile>('/profile')
    .then(response => dispatch(fetchProfileAction.success(response.data)))
    .catch(error => dispatch(fetchProfileAction.failure(error)));
};

// Selectors
export const getUserId = (state: ApplicationState) =>
  state.profile.profile && state.profile.profile.user_id;

// Reducer
export default createReducer(initialState)
  .handleAction(fetchProfileAction.success, (state, action) => ({
    ...state,
    profile: action.payload,
  }))
  .handleAction(fetchProfileAction.failure, state => state);
