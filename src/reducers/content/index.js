import { fromJS } from 'immutable';
import typeToReducer from 'type-to-reducer';
import * as types from './types';

const initialState = fromJS({
  data: [],
});

export default typeToReducer(
  {
    [types.CONTENT_LIST]: {
      FULFILLED: (state, { payload: { data } }) => state.merge({ data: fromJS(data) }),
    },
  },
  initialState,
);
