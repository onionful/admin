import { set } from 'lodash';
import typeToReducer from 'type-to-reducer';
import { ContentActionTypes, ContentState } from './types';

const initialState: ContentState = {};

export default typeToReducer<ContentState>(
  {
    [ContentActionTypes.CONTENT_LIST]: {
      FULFILLED: (state, { payload: { data }, meta: { collection } }) =>
        set(state, collection, data),
    },
    [ContentActionTypes.CONTENT_GET]: {
      FULFILLED: (state, { payload: { data }, meta: { collection, id } }) =>
        set(state, [collection, id], data),
    },
    [ContentActionTypes.CONTENT_CREATE]: {
      FULFILLED: (state, { payload: { data }, meta: { collection } }) =>
        set(state, [collection, data.id], data),
    },
    [ContentActionTypes.CONTENT_UPDATE]: {
      FULFILLED: (state, { payload: { data }, meta: { collection, id } }) =>
        set(state, [collection, id], data),
    },
  },
  initialState,
);
