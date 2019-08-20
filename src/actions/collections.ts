import { Dispatch } from 'redux';
import { Collection } from 'types';
import { createAsyncAction } from 'typesafe-actions';
import { api } from 'utils';

const getCollectionAction = createAsyncAction(
  'COLLECTIONS_GET_PENDING',
  'COLLECTIONS_GET_FULFILLED',
  'COLLECTIONS_GET_REJECTED',
)<string, Collection, any>();

const listCollectionsAction = createAsyncAction(
  'COLLECTIONS_LIST_PENDING',
  'COLLECTIONS_LIST_FULFILLED',
  'COLLECTIONS_LIST_REJECTED',
)<undefined, Collection[], any>();

const createCollectionAction = createAsyncAction(
  'COLLECTIONS_CREATE_PENDING',
  'COLLECTIONS_CREATE_FULFILLED',
  'COLLECTIONS_CREATE_REJECTED',
)<Collection, Collection, any>();

const updateCollectionAction = createAsyncAction(
  'COLLECTIONS_UPDATE_PENDING',
  'COLLECTIONS_UPDATE_FULFILLED',
  'COLLECTIONS_UPDATE_REJECTED',
)<{ id: string; data: Collection }, { id: string; data: Collection }, any>();

const deleteCollectionAction = createAsyncAction(
  'COLLECTIONS_DELETE_PENDING',
  'COLLECTIONS_DELETE_FULFILLED',
  'COLLECTIONS_DELETE_REJECTED',
)<string, Collection, any>();

export default {
  get: getCollectionAction,
  list: listCollectionsAction,
  create: createCollectionAction,
  update: updateCollectionAction,
  delete: deleteCollectionAction,
};

export const fetchCollection = (id: string) => (dispatch: Dispatch) => {
  dispatch(getCollectionAction.request(id));

  api
    .get(`/collections/${id}`)
    .then(response => dispatch(getCollectionAction.success(response.data)))
    .catch(error => dispatch(getCollectionAction.failure(error)));
};

// TODO params should not be any
export const listCollections = (params?: any) => (dispatch: Dispatch) => {
  dispatch(listCollectionsAction.request());

  api
    .get('/collections', params)
    .then(response => dispatch(listCollectionsAction.success(response.data)))
    .catch(error => dispatch(listCollectionsAction.failure(error)));
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
