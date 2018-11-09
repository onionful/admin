/* eslint-disable */
import { fromJS } from 'immutable';
import { keyBy } from 'lodash';
import typeToReducer from 'type-to-reducer';
import * as types from './types';

const initialState = fromJS({
  current: null,
  isLoading: false,
  error: null,
  data: {},
});

export default typeToReducer(
  {
    [types.SPACES_LIST]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({ isLoading: false, error: null, data: fromJS(keyBy(data, 'id')) }),
    },
    [types.SPACES_DELETE]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) => {
        console.log('data', data);
        return state;
      },
    },
    [types.SET_SPACE]: (state, { payload }) => state.set('current', payload),
  },
  initialState,
);
