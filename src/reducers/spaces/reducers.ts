import { keyBy } from 'lodash';
import typeToReducer from 'type-to-reducer';
import { SpacesActionTypes, SpacesState } from './types';
import { set, unset } from 'lodash';

const initialState: SpacesState = {
  current: undefined,
  data: {},
};

export default typeToReducer<SpacesState>(
  {
    [SpacesActionTypes.SPACES_ITEM]: {
      FULFILLED: (state, { payload: { data } }) => set(state, ['data', data.id], data),
    },
    [SpacesActionTypes.SPACES_LIST]: {
      FULFILLED: (state, { payload: { data } }) => set(state, 'data', keyBy(data, 'id')),
    },
    [SpacesActionTypes.SPACES_CREATE]: {
      FULFILLED: (state, { payload: { data } }) => set(state, ['data', data.id], data),
    },
    [SpacesActionTypes.SPACES_UPDATE]: {
      FULFILLED: (state, { payload: { data }, meta: { id } }) => {
        unset(state, ['data', id]);
        return set(state, ['data', data.id], data);
      },
    },
    [SpacesActionTypes.SPACES_DELETE]: {
      FULFILLED: (state, { payload: { data } }) => {
        unset(state, ['data', data.id]);
        return state;
      },
    },
    [SpacesActionTypes.SET_SPACE]: (state, { payload }) => set(state, 'current', payload),
  },
  initialState,
);
