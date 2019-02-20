import { keyBy, set } from 'lodash';
import typeToReducer from 'type-to-reducer';
import { CollectionsActionTypes, CollectionsState } from './types';

const initialState: CollectionsState = {
  data: {},
};

export default typeToReducer<CollectionsState>(
  {
    [CollectionsActionTypes.COLLECTIONS_LIST]: {
      FULFILLED: (state, { payload: { data } }) => set(state, 'data', keyBy(data, 'id')),
    },
    [CollectionsActionTypes.COLLECTIONS_GET]: {
      FULFILLED: (state, { payload: { data } }) => set(state, ['data', data.id], data),
    },
    [CollectionsActionTypes.COLLECTIONS_CREATE]: {
      FULFILLED: (state, { payload: { data } }) => set(state, ['data', data.id], data),
    },
    [CollectionsActionTypes.COLLECTIONS_UPDATE]: {
      FULFILLED: (state, { payload: { data } }) => set(state, ['data', data.id], data),
    },
  },
  initialState,
);
