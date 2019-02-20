import typeToReducer from 'type-to-reducer';
import { Auth } from 'utils';
import { AuthActionTypes, AuthState } from './types';

const auth = new Auth();

const initialState: AuthState = {
  isAuthenticated: auth.isAuthenticated(),
  profile: undefined,
};

export default typeToReducer<AuthState>(
  {
    [AuthActionTypes.LOGOUT_SUCCESS]: (state) => {
      auth.logout();
      return {
        ...state,
        isAuthenticated: false,
        profile: undefined,
      };
    },
    [AuthActionTypes.PROFILE_GET]: {
      FULFILLED: (state, { payload: { data } }) => ({ ...state, profile: data }),
    },
    [AuthActionTypes.PROFILE_UPDATE]: {
      FULFILLED: (state, { payload }) => ({ ...state, profile: payload }),
    },
  },
  initialState,
);
