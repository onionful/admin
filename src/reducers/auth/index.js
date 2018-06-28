import { fromJS } from 'immutable';
import typeToReducer from 'type-to-reducer';
import { Auth } from 'utils';
import * as types from './types';

const auth = new Auth();

const initialState = fromJS({
  isAuthenticated: auth.isAuthenticated(),
  isLoading: true,
  profile: null,
  error: null,
});

export default typeToReducer(
  {
    [types.LOGIN_REQUEST]: state =>
      state.merge({
        isLoading: true,
        error: null,
      }),
    [types.LOGIN_SUCCESS]: state =>
      state.merge({
        isLoading: false,
        isAuthenticated: true,
      }),
    [types.LOGIN_FAILURE]: (state, { error }) =>
      state.merge({
        isLoading: false,
        isAuthenticated: false,
        error,
      }),

    [types.LOGOUT_SUCCESS]: state =>
      state.merge({
        isAuthenticated: false,
        profile: null,
      }),

    [types.PROFILE_GET]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({ isLoading: false, error: null }).set('profile', fromJS(data)),
    },
    [types.PROFILE_UPDATE]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload }) =>
        state.merge({ isLoading: false, error: null }).set('profile', fromJS(payload)),
    },
  },
  initialState,
);

export const getProfile = state => state.getIn(['auth', 'profile']);

export const isAllowed = (state, permission) => {
  const permissions = getProfile(state).get('permissions');
  return !permission || (permissions && permissions.contains(permission));
};
