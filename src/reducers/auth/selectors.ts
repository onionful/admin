import { ApplicationState } from 'reducers';
import { Profile } from 'types';
import { Permission } from 'utils';

export const getProfile = (state: ApplicationState): Profile | undefined => state.auth.profile;

export const getId = (state: ApplicationState) => state.auth.profile && state.auth.profile.user_id;

export const isAllowed = (state: ApplicationState, permission: Permission) => {
  const profile = getProfile(state);
  return profile && (!permission || profile.permissions.includes(permission));
};
