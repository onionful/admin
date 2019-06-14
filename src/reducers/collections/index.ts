import { keyBy, set, unset } from 'lodash';
import { ApplicationState } from 'reducers';
import { Dispatch } from 'redux';
import { Collection, Dictionary } from 'types';
import { createReducer } from 'typesafe-actions';
import { api } from 'utils';
import actions from './actions';

const {
  createCollectionAction,
  deleteCollectionAction,
  fetchCollectionAction,
  fetchCollectionsListAction,
  updateCollectionAction,
} = actions;

export interface CollectionsState {
  data: Dictionary<Collection>;
}

const initialState: CollectionsState = {
  data: {},
};

// Effects
export const fetchCollection = (id: string) => (dispatch: Dispatch) => {
  dispatch(fetchCollectionAction.request(id));

  api
    .get(`/collections/${id}`)
    .then(response => dispatch(fetchCollectionAction.success(response.data)))
    .catch(error => dispatch(fetchCollectionAction.failure(error)));
};

// TODO params should not be any
export const fetchCollectionsList = (params?: any) => (dispatch: Dispatch) => {
  dispatch(fetchCollectionsListAction.request(params));

  api
    .get('/collections', params)
    .then(response => dispatch(fetchCollectionsListAction.success(response.data)))
    .catch(error => dispatch(fetchCollectionsListAction.failure(error)));
};

export const createCollection = (data: Collection) => (dispatch: Dispatch) => {
  dispatch(createCollectionAction.request(data));

  api
    .post('/collections', data)
    .then(response => dispatch(createCollectionAction.success(response.data)))
    .catch(error => dispatch(createCollectionAction.failure(error)));
};

export const updateCollection = (id: string, data: Collection) => (dispatch: Dispatch) => {
  dispatch(updateCollectionAction.request({ id, data }));

  api
    .put(`/collections/${id}`, data)
    .then(response => dispatch(updateCollectionAction.success({ id, data: response.data })))
    .catch(error => dispatch(updateCollectionAction.failure(error)));
};

export const deleteCollection = (id: string) => (dispatch: Dispatch) => {
  dispatch(deleteCollectionAction.request(id));

  api
    .delete(`/collections/${id}`)
    .then(response => dispatch(deleteCollectionAction.success(response.data)))
    .catch(error => dispatch(deleteCollectionAction.failure(error)));
};

// Selectors
export const getCollections = (state: ApplicationState) => state.collections.data;

export const getCollection = (state: ApplicationState, id: string) =>
  state.collections.data[id] ||
  ({
    id: '',
    name: '',
    fields: [{ id: 'id', name: 'ID', type: 'identifier', fieldRef: null }],
  } as Collection);

// Reducer
export default createReducer(initialState)
  .handleAction(fetchCollectionsListAction.success, (state, { payload }) =>
    set(state, 'data', keyBy(payload, 'id')),
  )
  .handleAction(fetchCollectionAction.success, (state, { payload }) =>
    set(state, ['data', payload.id], payload),
  )
  .handleAction(createCollectionAction.success, (state, { payload }) =>
    set(state, ['data', payload.id], payload),
  )
  .handleAction(updateCollectionAction.success, (state, { payload: { id, data } }) => {
    unset(state, ['data', id]);
    return set(state, ['data', data.id], data);
  })
  .handleAction(deleteCollectionAction.success, (state, { payload }) => {
    unset(state, ['data', payload.id]);
    return state;
  });
