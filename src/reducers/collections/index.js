import { fromJS } from 'immutable';
import { keyBy } from 'lodash';
import typeToReducer from 'type-to-reducer';
import * as types from './types';

const initialState = fromJS({
  isLoading: false,
  error: null,
  data: {},
});

export default typeToReducer(
  {
    [types.COLLECTIONS_ITEM]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({ isLoading: false, error: null }).setIn(['data', data.id], fromJS(data)),
    },
    [types.COLLECTIONS_LIST]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({
          isLoading: false,
          error: null,
          data: fromJS(keyBy(data, 'id')),
        }),
    },
    [types.COLLECTIONS_CREATE]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({ isLoading: false, error: null }).setIn(['data', data.id], fromJS(data)),
    },
    [types.COLLECTIONS_UPDATE]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({ isLoading: false, error: null }).setIn(['data', data.id], fromJS(data)),
    },
  },
  initialState,
);
