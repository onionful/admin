import { keyBy } from 'lodash';
import typeToReducer from 'type-to-reducer';
import { UsersActionTypes, UsersState } from './types';
import { set, merge } from 'lodash';

const initialState = {
  data: {
    users: [],
    total: 0,
    limit: 50,
  },
  labels: {},
};

export default typeToReducer<UsersState>(
  {
    [UsersActionTypes.USERS_LIST]: {
      FULFILLED: (state, { payload: { data } }) => set(state, 'data', data),
    },
    [UsersActionTypes.USERS_LABELS]: {
      FULFILLED: (state, { payload }) => ({
        ...state,
        labels: merge(state.labels, keyBy(payload, 'user_id')),
      }),
    },
  },
  initialState,
);
