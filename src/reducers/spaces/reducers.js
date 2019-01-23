import { fromJS } from 'immutable';
import { keyBy } from 'lodash';
import typeToReducer from 'type-to-reducer';
import * as types from './types';

const initialState = fromJS({
  current: null,
  data: {},
});

export default typeToReducer(
  {
    [types.SPACES_ITEM]: {
      FULFILLED: (state, { payload: { data } }) => state.setIn(['data', data.id], fromJS(data)),
    },
    [types.SPACES_LIST]: {
      FULFILLED: (state, { payload: { data } }) => state.merge({ data: fromJS(keyBy(data, 'id')) }),
    },
    [types.SPACES_CREATE]: {
      FULFILLED: (state, { payload: { data } }) => state.setIn(['data', data.id], fromJS(data)),
    },
    [types.SPACES_UPDATE]: {
      FULFILLED: (state, { payload: { data }, meta: { id } }) =>
        state.deleteIn(['data', id]).setIn(['data', data.id], fromJS(data)),
    },
    [types.SPACES_DELETE]: {
      FULFILLED: (state, { payload: { data } }) => state.deleteIn(['data', data.id]),
    },
    [types.SET_SPACE]: (state, { payload }) => state.set('current', payload),
  },
  initialState,
);
