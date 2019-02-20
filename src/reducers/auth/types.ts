import { Profile } from 'types';

export interface AuthState {
  isAuthenticated: boolean;
  profile?: Profile;
}

export interface ProfileUpdatePayload {
  space: string;
}

export enum AuthActionTypes {
  PROFILE_GET = 'PROFILE_GET',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
}
