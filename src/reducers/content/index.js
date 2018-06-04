import { fromJS } from 'immutable';
import typeToReducer from 'type-to-reducer';
import * as types from './types';

const initialState = fromJS({
  isLoading: false,
  error: null,
  data: [],
});

export default typeToReducer(
  {
    [types.CONTENT_LIST]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state.merge({ isLoading: false, error: null, data }),
    },
  },
  initialState,
);
