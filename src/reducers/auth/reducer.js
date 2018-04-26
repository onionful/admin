import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { Auth } from 'utils';
import * as types from './types';

const auth = new Auth();

const initialState = fromJS({
  isAuthenticated: auth.isAuthenticated(),
  isFetching: false,
  profile: null,
  error: null,
});

export default typeToReducer({
  [types.LOGIN_REQUEST]: state => state.merge({ isPending: true, error: null }),
  [types.LOGIN_SUCCESS]: state => state.merge({
    isPending: false,
    isAuthenticated: true,
  }),
  [types.LOGIN_FAILURE]: (state, { error }) => state.merge({
    isPending: false,
    isAuthenticated: false,
    error,
  }),
  [types.LOGOUT_SUCCESS]: state => state.merge({
    isAuthenticated: false,
    profile: null,
  }),
  [types.PROFILE_REQUEST]: state => state.merge({ isPending: true, error: null }),
  [types.PROFILE_SUCCESS]: (state, { profile }) => state.merge({
    isPending: false,
    profile,
  }),
  [types.PROFILE_FAILURE]: (state, { error }) => state.merge({
    isPending: false,
    profile: null,
    error,
  }),
}, initialState);

