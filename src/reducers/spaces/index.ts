import { keyBy, set, unset } from 'lodash';
import { ApplicationState } from 'reducers';
import { Dispatch } from 'redux';
import { Dictionary, Space } from 'types';
import { createReducer } from 'typesafe-actions';
import { api } from 'utils';
import actions from './actions';

const {
  createSpaceAction,
  deleteSpaceAction,
  fetchSpaceAction,
  fetchSpacesListAction,
  updateSpaceAction,
  setSpaceAction,
} = actions;

export interface SpacesState {
  current?: string;
  data: Dictionary<Space>;
}

const initialState: SpacesState = {
  current: undefined,
  data: {},
};

// Effects
// TODO do not return <any>
export const createSpace = (data: Space) => (dispatch: Dispatch): Promise<any> => {
  dispatch(createSpaceAction.request(data));

  return api
    .post('/spaces', data)
    .then(response => dispatch(createSpaceAction.success(response.data)))
    .catch(error => dispatch(createSpaceAction.failure(error)));
};

export const deleteSpace = (id: string) => (dispatch: Dispatch) => {
  dispatch(deleteSpaceAction.request(id));

  api
    .delete(`/spaces/${id}`)
    .then(response => dispatch(deleteSpaceAction.success(response.data)))
    .catch(error => dispatch(deleteSpaceAction.failure(error)));
};

export const fetchSpace = (id: string) => (dispatch: Dispatch) => {
  dispatch(fetchSpaceAction.request(id));

  api
    .get(`/spaces/${id}`)
    .then(response => dispatch(fetchSpaceAction.success(response.data)))
    .catch(error => dispatch(fetchSpaceAction.failure(error)));
};

export const fetchSpacesList = () => (dispatch: Dispatch) => {
  dispatch(fetchSpacesListAction.request());

  api
    .get('/spaces')
    .then(response => dispatch(fetchSpacesListAction.success(response.data)))
    .catch(error => dispatch(fetchSpacesListAction.failure(error)));
};

// TODO meta: { id } ??
export const updateSpace = (id: string, data: Space) => (dispatch: Dispatch): Promise<any> => {
  dispatch(updateSpaceAction.request({ id, data }));

  return api
    .put(`/spaces/${id}`, data)
    .then(response => dispatch(updateSpaceAction.success({ id, data: response.data })))
    .catch(error => dispatch(updateSpaceAction.failure(error)));
};

export const setSpace = (space: string) => {
  localStorage.setItem('space', space);
  return setSpaceAction(space);
};

// Selectors
export const getSpace = (state: ApplicationState, id: string) => state.spaces.data[id];

export const getSpaces = (state: ApplicationState) => state.spaces.data;

export const getCurrentSpace = (state: ApplicationState) =>
  (state.spaces.current && state.spaces.data[state.spaces.current]) || undefined;

// Reducer
export default createReducer(initialState)
  .handleAction(fetchSpaceAction.success, (state, { payload }) =>
    set(state, ['data', payload.id], payload),
  )
  .handleAction(fetchSpacesListAction.success, (state, { payload }) =>
    set(state, 'data', keyBy(payload, 'id')),
  )
  .handleAction(createSpaceAction.success, (state, { payload }) =>
    set(state, ['data', payload.id], payload),
  )
  .handleAction(updateSpaceAction.success, (state, { payload: { id, data } }) => {
    unset(state, ['data', id]);
    return set(state, ['data', data.id], data);
  })
  .handleAction(deleteSpaceAction.success, (state, { payload }) => {
    unset(state, ['data', payload.id]);
    return state;
  })
  .handleAction(setSpaceAction, (state, { payload }) => set(state, 'current', payload));
