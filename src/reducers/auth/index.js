import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { Auth } from 'utils';
import * as types from './types';

const auth = new Auth();

const initialState = fromJS({
  isAuthenticated: auth.isAuthenticated(),
  isLoading: true,
  profile: null,
  error: null,
});

export default typeToReducer({
  [types.LOGIN_REQUEST]: state => state.merge({
    isLoading: true,
    error: null,
  }),
  [types.LOGIN_SUCCESS]: state => state.merge({
    isLoading: false,
    isAuthenticated: true,
  }),
  [types.LOGIN_FAILURE]: (state, { error }) => state.merge({
    isLoading: false,
    isAuthenticated: false,
    error,
  }),

  [types.LOGOUT_SUCCESS]: state => state.merge({
    isAuthenticated: false,
    profile: null,
  }),

  [types.PROFILE_REQUEST]: state => state.merge({
    isLoading: true,
    error: null,
  }),
  [types.PROFILE_SUCCESS]: (state, { profile }) => state.merge({
    isLoading: false,
    profile,
  }),
  [types.PROFILE_FAILURE]: (state, { error }) => state.merge({
    isLoading: false,
    profile: null,
    error,
  }),
}, initialState);

export const isAllowed = (state, permission) => {
  const permissions = state.getIn(['auth', 'profile', 'permissions']);
  //console.log('permission', permission);
  //console.log('permissions', permissions);
  //console.log(!permission || (permissions && permissions.contains(permission)));
  return !permission || (permissions && permissions.contains(permission));
};
