import { fromJS } from 'immutable';
import { keyBy } from 'lodash';
import typeToReducer from 'type-to-reducer';
import * as types from './types';

const initialState = fromJS({
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
      FULFILLED: (state, { payload: { data } }) => state.merge({ data: fromJS(data) }),
    },
    [types.USERS_LABELS]: {
      FULFILLED: (state, { payload }) =>
        state.mergeDeep({ labels: fromJS(keyBy(payload, 'user_id')) }),
    },
  },
  initialState,
);
