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
    [types.COLLECTION_ITEM]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({ isLoading: false, error: null }).setIn(['data', data.id], fromJS(data)),
    },
    [types.COLLECTION_LIST]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({
          isLoading: false,
          error: null,
          data: keyBy(data, 'id'),
        }),
    },
    [types.COLLECTION_CREATE]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({ isLoading: false, error: null }).setIn(['data', data.id], fromJS(data)),
    },
    [types.COLLECTION_UPDATE]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({ isLoading: false, error: null }).setIn(['data', data.id], fromJS(data)),
    },
  },
  initialState,
);
