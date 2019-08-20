import profileActions from 'actions/profile';
import actions from 'actions/spaces';
import { keyBy, set, unset } from 'lodash';
import { ApplicationState } from 'reducers';
import { Dictionary, Space } from 'types';
import { createReducer } from 'typesafe-actions';

export interface SpacesState {
  current?: string;
  data: Dictionary<Space>;
}

const initialState: SpacesState = {
  current: undefined,
  data: {},
};

export default createReducer(initialState)
  .handleAction(actions.get.success, (state, { payload }) =>
    set(state, ['data', payload.id], payload),
  )
  .handleAction(actions.list.success, (state, { payload }) =>
    set(state, 'data', keyBy(payload, 'id')),
  )
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
  })
  .handleAction(actions.set, (state, { payload }) => set(state, 'current', payload.id))
  .handleAction(profileActions.fetch.success, (state, { payload: { user_metadata: { space } } }) =>
    set(state, 'current', space),
  );

export const getSpace = (state: ApplicationState, id: string) => state.spaces.data[id];

export const getSpaces = (state: ApplicationState) => state.spaces.data;

export const getCurrentSpace = (state: ApplicationState) =>
  (state.spaces.current && state.spaces.data[state.spaces.current]) || undefined;
