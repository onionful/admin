import { fromJS } from 'immutable';
import { keyBy } from 'lodash';
import typeToReducer from 'type-to-reducer';
import * as types from './types';

const initialState = fromJS({
  data: {},
});

export default typeToReducer(
  {
    [types.COLLECTIONS_ITEM]: {
      FULFILLED: (state, { payload: { data } }) => state.setIn(['data', data.id], fromJS(data)),
    },
    [types.COLLECTIONS_LIST]: {
      FULFILLED: (state, { payload: { data } }) =>
        state.mergeIn(['data'], fromJS(keyBy(data, 'id'))),
    },
    [types.COLLECTIONS_CREATE]: {
      FULFILLED: (state, { payload: { data } }) => state.setIn(['data', data.id], fromJS(data)),
    },
    [types.COLLECTIONS_UPDATE]: {
      FULFILLED: (state, { payload: { data } }) => state.setIn(['data', data.id], fromJS(data)),
    },
  },
  initialState,
);
