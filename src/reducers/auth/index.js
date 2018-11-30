import { fromJS } from 'immutable';
import typeToReducer from 'type-to-reducer';
import { Auth } from 'utils';
import * as types from './types';

const auth = new Auth();

const initialState = fromJS({
  isAuthenticated: auth.isAuthenticated(),
  profile: null,
});

export default typeToReducer(
  {
    [types.LOGIN_PENDING]: state => {
      auth.login();
      return state;
    },
    [types.LOGIN_SUCCESS]: state => state.merge({ isAuthenticated: true }),
    [types.LOGIN_REJECTED]: state => state.merge({ isAuthenticated: false }),

    [types.LOGOUT_SUCCESS]: state => {
      auth.logout();
      return state.merge({
        isAuthenticated: false,
        profile: null,
      });
    },

    [types.PROFILE_GET]: {
      FULFILLED: (state, { payload: { data } }) => state.set('profile', fromJS(data)),
    },
    [types.PROFILE_UPDATE]: {
      FULFILLED: (state, { payload }) => state.set('profile', fromJS(payload)),
    },
  },
  initialState,
);

export const getProfile = state => state.getIn(['auth', 'profile']);

export const isAllowed = (state, permission) => {
  const permissions = getProfile(state).get('permissions');
  return !permission || (permissions && permissions.contains(permission));
};
