import { fromJS } from 'immutable';
import typeToReducer from 'type-to-reducer';
import * as types from './types';

const initialState = fromJS({});

export default typeToReducer(
  {
    [types.CONTENT_LIST]: {
      FULFILLED: (state, { payload: { data }, meta: { collection } }) =>
        state.merge({ [collection]: fromJS(data) }),
    },
    [types.CONTENT_GET]: {
      FULFILLED: (state, { payload: { data }, meta: { collection, id } }) =>
        state.merge({ [collection]: { [id]: fromJS(data) } }),
    },
    [types.CONTENT_CREATE]: {
      FULFILLED: (state, { payload: { data }, meta: { collection } }) =>
        state.setIn([collection, data.id], fromJS(data)),
    },
    [types.CONTENT_UPDATE]: {
      FULFILLED: (state, { payload: { data }, meta: { collection, id } }) =>
        state.setIn([collection, id], fromJS(data)),
    },
  },
  initialState,
);
