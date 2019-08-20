import actions from 'actions/collections';
import { keyBy, set, unset } from 'lodash';
import { ApplicationState } from 'reducers';
import { Collection, Dictionary } from 'types';
import { createReducer } from 'typesafe-actions';

export interface CollectionsState {
  data: Dictionary<Collection>;
}

const initialState: CollectionsState = {
  data: {},
};

export default createReducer(initialState)
  .handleAction(actions.list.success, (state, { payload }) =>
    set(state, 'data', keyBy(payload, 'id')),
  )
  // .handleAction(actions.list.success, (state, { payload }) =>
  //   set(state, ['data', payload.id], payload),
  // )
  .handleAction(actions.create.success, (state, { payload }) =>
    set(state, ['data', payload.id], payload),
  )
  .handleAction(actions.update.success, (state, { payload: { id, data } }) => {
    unset(state, ['data', id]);
    return set(state, ['data', data.id], data);
  })
  .handleAction(actions.delete.success, (state, { payload }) => {
    unset(state, ['data', payload.id]);
    return state;
  });

// Selectors
export const getCollections = (state: ApplicationState) => state.collections.data;

export const getCollection = (state: ApplicationState, id: string) =>
  state.collections.data[id] ||
  ({
    id: '',
    name: '',
    fields: [{ id: 'id', name: 'ID', type: 'identifier', fieldRef: null }],
  } as Collection);
