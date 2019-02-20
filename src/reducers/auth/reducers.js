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
