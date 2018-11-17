import { fromJS } from 'immutable';
import { keyBy } from 'lodash';
import typeToReducer from 'type-to-reducer';
import * as types from './types';

const initialState = fromJS({
  isLoading: false,
  error: null,
  data: {
    users: [],
    total: 0,
    limit: 50,
  },
  labels: {},
});

export default typeToReducer(
  {
    [types.USERS_LIST]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({ isLoading: false, error: null, data: fromJS(data) }),
    },
    [types.USERS_LABELS]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload }) =>
        state.mergeDeep({
          isLoading: false,
          error: null,
          labels: fromJS(keyBy(payload, 'user_id')),
        }),
    },
  },
  initialState,
);
